import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  applyCoralHoverHighlight,
  buildPolypHighlightMeshes,
  buildTopicHighlightMap,
  buildTrunkHighlightMeshes,
  formatCoralHoverTooltip,
  getTopicNameFromHoverTarget,
  pickCoralHoverTarget,
  type CoralHoverTarget,
  type TopicMeshState,
} from "../three/coralTopicHighlight";
import { coralSilhouette } from "../three/generators/coralSilhouette";
import type { OrganismData, OrganismGenerator } from "../three/organismTypes";
import {
  applyReefSceneAtmosphere,
  createReefEnvironment,
  type ReefEnvironmentHandle,
} from "../three/reefEnvironment";
import { isOrganismEmpty } from "@/lib/organismData";
import {
  DEFAULT_REEF_THEME,
  reefThemeKey,
  type ReefThemeSettings,
} from "@/lib/reefTheme";
import { cn } from "@/lib/utils";

const defaultGenerator: OrganismGenerator = coralSilhouette;

function getOrganismDataKey(data: OrganismData): string {
  return JSON.stringify({
    accountAgeDays: data.accountAgeDays,
    topics: data.topics,
    posts: (data.posts ?? []).map((post) => post.id).sort(),
  });
}

type SceneApi = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  causticLight: THREE.DirectionalLight;
  coralMount: THREE.Group;
  contactShadow: THREE.Mesh;
  frameId: number;
  startTime: number;
  coral: THREE.Group;
  topicMeshes: ReturnType<typeof buildTopicHighlightMap>;
  trunkMeshes: TopicMeshState[];
  polypMeshes: TopicMeshState[];
  coralCleanup: () => void;
  envHandle: ReefEnvironmentHandle | null;
  updateEnvironment: ((elapsedSeconds: number) => void) | null;
};

export type ScreenPoint = { x: number; y: number };

export type OrganismViewportHandle = {
  exportPng: () => string | null;
  getPostScreenPosition: (postId: string) => ScreenPoint | null;
};

function findPolyp(root: THREE.Object3D, postId: string): THREE.Object3D | null {
  let found: THREE.Object3D | null = null;
  root.traverse((obj) => {
    if (found) return;
    if (obj.userData?.coralRole === "polyp" && obj.userData?.postId === postId) {
      found = obj;
    }
  });
  return found;
}

function projectPostToScreen(
  api: SceneApi,
  host: HTMLDivElement,
  postId: string,
): ScreenPoint | null {
  const polyp = findPolyp(api.coral, postId);
  if (!polyp) return null;

  const worldPos = new THREE.Vector3();
  polyp.getWorldPosition(worldPos);
  const projected = worldPos.project(api.camera);

  const rect = host.getBoundingClientRect();
  return {
    x: (projected.x * 0.5 + 0.5) * rect.width + rect.left,
    y: (-projected.y * 0.5 + 0.5) * rect.height + rect.top,
  };
}

type OrganismViewportProps = {
  data: OrganismData;
  dataSource?: "analysis" | "sample" | "empty";
  appearance?: "light" | "dark";
  reefTheme?: ReefThemeSettings;
  isLoading?: boolean;
  isEmpty?: boolean;
  onBranchClick?: (topicName: string) => void;
  onPostClick?: (topicName: string, postId: string, anchor: ScreenPoint) => void;
  onTopicHover?: (topicName: string | null) => void;
  /** Fired when the camera moves so post anchor lines can be recomputed. */
  onSceneChange?: () => void;
  generator?: OrganismGenerator;
  /** Omit inner border when the parent supplies the reef frame. */
  frameless?: boolean;
};

export const OrganismViewport = forwardRef<OrganismViewportHandle, OrganismViewportProps>(
  function OrganismViewport(
    {
      data,
      dataSource = "analysis",
      appearance = "light",
      reefTheme = DEFAULT_REEF_THEME,
      isLoading = false,
      isEmpty = false,
      onBranchClick,
      onPostClick,
      onSceneChange,
      onTopicHover,
      generator = defaultGenerator,
      frameless = false,
    },
    ref,
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneApiRef = useRef<SceneApi | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);
    const onTopicHoverRef = useRef(onTopicHover);
    const onBranchClickRef = useRef(onBranchClick);
    const onPostClickRef = useRef(onPostClick);
    const onSceneChangeRef = useRef(onSceneChange);
    const cameraStateRef = useRef<{
      position: THREE.Vector3;
      target: THREE.Vector3;
    } | null>(null);
    const hoveredTargetRef = useRef<CoralHoverTarget | null>(null);
    const reefThemeRef = useRef(reefTheme);
    onTopicHoverRef.current = onTopicHover;
    onBranchClickRef.current = onBranchClick;
    onPostClickRef.current = onPostClick;
    onSceneChangeRef.current = onSceneChange;
    reefThemeRef.current = reefTheme;

    const dataKey = getOrganismDataKey(data);
    const themeKey = reefThemeKey(reefTheme);
    const showCoral = !isEmpty && dataSource !== "empty" && !isOrganismEmpty(data);

    useImperativeHandle(ref, () => ({
      exportPng: () => {
        const renderer = rendererRef.current;
        if (!renderer) return null;
        return renderer.domElement.toDataURL("image/png");
      },
      getPostScreenPosition: (postId: string) => {
        const api = sceneApiRef.current;
        const host = hostRef.current;
        if (!api || !host) return null;
        return projectPostToScreen(api, host, postId);
      },
    }));

    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;

      const isDark = appearance === "dark";
      const scene = new THREE.Scene();
      applyReefSceneAtmosphere(scene, reefThemeRef.current, isDark);

      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      const defaultCameraPosition = new THREE.Vector3(3.6, 2.95, 5.1);
      const defaultTarget = new THREE.Vector3(0, 1.5, 0);
      camera.position.copy(cameraStateRef.current?.position ?? defaultCameraPosition);
      if (!cameraStateRef.current) {
        camera.lookAt(defaultTarget);
      }

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isDark ? 1.12 : 1.2;
      host.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "none";
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight(
        isDark ? "#1a3048" : "#c8e0f0",
        isDark ? 0.45 : 0.75,
      );
      const hemiLight = new THREE.HemisphereLight(
        isDark ? "#ffd8c8" : "#fff0e8",
        isDark ? "#020a14" : "#4a7a94",
        isDark ? 0.55 : 0.85,
      );
      const keyLight = new THREE.DirectionalLight(isDark ? "#ffe8d8" : "#fff8f0", isDark ? 2.8 : 3.2);
      keyLight.position.set(1.5, 10, 3);
      const fillLight = new THREE.DirectionalLight(isDark ? "#5a9ec0" : "#b8dce8", 0.55);
      fillLight.position.set(-5, 3, -2);
      const rimLight = new THREE.DirectionalLight(isDark ? "#8ed4f0" : "#ffffff", isDark ? 0.7 : 0.45);
      rimLight.position.set(-3, 5, -7);
      const causticLight = new THREE.DirectionalLight(isDark ? "#ffc8a8" : "#ffe0c8", 0.35);
      causticLight.position.set(3, 6, 2);
      const underLight = new THREE.DirectionalLight(isDark ? "#1a4a68" : "#4a8aaa", 0.25);
      underLight.position.set(0, -2, 2);
      scene.add(ambientLight, hemiLight, keyLight, fillLight, rimLight, causticLight, underLight);

      const coralMount = new THREE.Group();
      coralMount.name = "coralMount";
      scene.add(coralMount);

      const shadowGeometry = new THREE.CircleGeometry(0.62, 32);
      const shadowMaterial = new THREE.MeshBasicMaterial({
        color: isDark ? "#010810" : "#2a5a74",
        transparent: true,
        opacity: isDark ? 0.5 : 0.28,
      });
      const contactShadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
      contactShadow.rotation.x = -Math.PI / 2;
      contactShadow.position.y = -0.02;
      contactShadow.visible = false;
      scene.add(contactShadow);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.enableZoom = true;
      controls.zoomSpeed = 0.85;
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.target.copy(cameraStateRef.current?.target ?? defaultTarget);
      controls.minDistance = 2.4;
      controls.maxDistance = 12;
      controls.maxPolarAngle = Math.PI * 0.92;
      controls.update();

      let isOrbiting = false;
      const handleControlStart = () => {
        isOrbiting = true;
      };
      const handleControlEnd = () => {
        isOrbiting = false;
      };
      controls.addEventListener("start", handleControlStart);
      controls.addEventListener("end", handleControlEnd);

      const resize = () => {
        const { clientWidth, clientHeight } = host;
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const updatePointer = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const pickTarget = (): CoralHoverTarget | null => {
        raycaster.setFromCamera(pointer, camera);
        return pickCoralHoverTarget(sceneApiRef.current?.coral ?? new THREE.Group(), raycaster);
      };

      const setHoveredTarget = (target: CoralHoverTarget | null) => {
        const api = sceneApiRef.current;
        if (!api) return;

        const prev = hoveredTargetRef.current;
        const prevKey =
          prev?.kind === "polyp"
            ? `polyp:${prev.postId}`
            : prev?.kind === "topic"
              ? `topic:${prev.name}`
              : prev?.kind === "trunk"
                ? "trunk"
                : null;
        const nextKey =
          target?.kind === "polyp"
            ? `polyp:${target.postId}`
            : target?.kind === "topic"
              ? `topic:${target.name}`
              : target?.kind === "trunk"
                ? "trunk"
                : null;
        if (prevKey === nextKey) return;

        hoveredTargetRef.current = target;
        applyCoralHoverHighlight(api.topicMeshes, api.trunkMeshes, api.polypMeshes, target);
        onTopicHoverRef.current?.(getTopicNameFromHoverTarget(target));

        const tooltip = tooltipRef.current;
        if (!tooltip) return;

        const text = formatCoralHoverTooltip(target);
        if (text) {
          tooltip.textContent = text;
          tooltip.hidden = false;
        } else {
          tooltip.textContent = "";
          tooltip.hidden = true;
        }
      };

      const handlePointerMove = (event: MouseEvent) => {
        if (isOrbiting) return;
        updatePointer(event);
        const target = pickTarget();
        setHoveredTarget(target);
        renderer.domElement.style.cursor =
          target?.kind === "topic" || target?.kind === "polyp" ? "pointer" : "grab";
      };

      const handlePointerLeave = () => {
        setHoveredTarget(null);
        renderer.domElement.style.cursor = "grab";
      };

      const notifySceneChange = () => {
        onSceneChangeRef.current?.();
      };

      const handleClick = (event: MouseEvent) => {
        updatePointer(event);
        const target = pickTarget();
        if (target?.kind === "polyp" && onPostClickRef.current) {
          const api = sceneApiRef.current;
          const anchor =
            api && host ? projectPostToScreen(api, host, target.postId) : null;
          onPostClickRef.current(target.topicName, target.postId, anchor ?? {
            x: event.clientX,
            y: event.clientY,
          });
          return;
        }
        const topicName = getTopicNameFromHoverTarget(target);
        if (topicName) onBranchClickRef.current?.(topicName);
      };

      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.addEventListener("click", handleClick);
      controls.addEventListener("change", notifySceneChange);
      controls.addEventListener("end", notifySceneChange);
      renderer.domElement.style.cursor = "grab";

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
      };
      host.addEventListener("wheel", handleWheel, { passive: false });

      const startTime = performance.now();
      let frameId = 0;

      const api: SceneApi = {
        scene,
        camera,
        renderer,
        controls,
        causticLight,
        coralMount,
        contactShadow,
        frameId: 0,
        startTime,
        coral: new THREE.Group(),
        topicMeshes: new Map(),
        trunkMeshes: [],
        polypMeshes: [],
        coralCleanup: () => {},
        envHandle: null,
        updateEnvironment: null,
      };
      sceneApiRef.current = api;

      const render = () => {
        frameId = window.requestAnimationFrame(render);
        const t = (performance.now() - startTime) * 0.00025;
        const elapsedSeconds = (performance.now() - startTime) * 0.001;
        causticLight.position.set(
          3 + Math.sin(t) * 1.2,
          6 + Math.cos(t * 0.7) * 0.4,
          2 + Math.cos(t) * 0.8,
        );
        causticLight.intensity = 0.32 + Math.sin(t * 1.4) * 0.1;
        api.updateEnvironment?.(elapsedSeconds);
        controls.update();
        renderer.render(scene, camera);
      };
      render();

      return () => {
        cameraStateRef.current = {
          position: camera.position.clone(),
          target: controls.target.clone(),
        };
        window.cancelAnimationFrame(frameId);
        controls.removeEventListener("start", handleControlStart);
        controls.removeEventListener("end", handleControlEnd);
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
        renderer.domElement.removeEventListener("click", handleClick);
        controls.removeEventListener("change", notifySceneChange);
        controls.removeEventListener("end", notifySceneChange);
        host.removeEventListener("wheel", handleWheel);
        renderer.domElement.style.cursor = "";
        hoveredTargetRef.current = null;
        onTopicHoverRef.current?.(null);
        observer.disconnect();
        controls.dispose();
        api.coralCleanup();
        api.envHandle?.dispose();
        shadowGeometry.dispose();
        shadowMaterial.dispose();
        renderer.dispose();
        rendererRef.current = null;
        sceneApiRef.current = null;
        host.removeChild(renderer.domElement);
      };
    }, [appearance]);

    useEffect(() => {
      const api = sceneApiRef.current;
      if (!api) return;

      api.envHandle?.dispose();
      api.envHandle?.group.removeFromParent();

      const isDark = appearance === "dark";
      applyReefSceneAtmosphere(api.scene, reefTheme, isDark);
      const envHandle = createReefEnvironment(reefTheme, isDark);
      api.scene.add(envHandle.group);
      api.envHandle = envHandle;
      api.updateEnvironment = envHandle.update;

      return () => {
        envHandle.dispose();
        envHandle.group.removeFromParent();
        if (api.envHandle === envHandle) {
          api.envHandle = null;
          api.updateEnvironment = null;
        }
      };
    }, [themeKey, appearance, reefTheme]);

    useEffect(() => {
      const api = sceneApiRef.current;
      if (!api) return;

      api.coralCleanup();
      api.coral.removeFromParent();
      api.coral = new THREE.Group();
      api.topicMeshes = new Map();
      api.trunkMeshes = [];
      api.polypMeshes = [];
      api.contactShadow.visible = false;

      if (showCoral) {
        const generated = generator(api.scene, data);
        api.coral = generated.coral;
        api.coralCleanup = generated.cleanup;
        api.scene.remove(api.coral);
        api.coralMount.add(api.coral);
        api.topicMeshes = buildTopicHighlightMap(api.coral);
        api.trunkMeshes = buildTrunkHighlightMeshes(api.coral);
        api.polypMeshes = buildPolypHighlightMeshes(api.coral);
        api.contactShadow.visible = true;
      } else {
        api.coralCleanup = () => {};
      }

      applyCoralHoverHighlight(api.topicMeshes, api.trunkMeshes, api.polypMeshes, null);

      return () => {
        api.coralCleanup();
        api.coral.removeFromParent();
        api.contactShadow.visible = false;
      };
    }, [dataKey, showCoral, generator, data]);

    return (
      <div className={cn("organism-viewport-wrapper", frameless && "h-full")}>
        <div
          className={cn(
            "organism-viewport",
            frameless && "organism-viewport--frameless h-full",
            isLoading && "organism-viewport--loading",
          )}
          ref={hostRef}
        >
          {isLoading ? (
            <div className="viewport-overlay" role="status" aria-live="polite">
              Loading coral…
            </div>
          ) : null}
          {!isLoading && (isEmpty || dataSource === "empty") ? (
            <div className="viewport-overlay" role="status" aria-live="polite">
              <div className="max-w-sm px-6 text-center">
                <p className="font-semibold text-foreground">No analysis yet</p>
                <p className="mt-1 text-sm leading-relaxed">
                  Upload an export to grow your first coral.
                </p>
              </div>
            </div>
          ) : null}
          <div ref={tooltipRef} className="viewport-tooltip" hidden aria-live="polite" />
        </div>
      </div>
    );
  },
);
