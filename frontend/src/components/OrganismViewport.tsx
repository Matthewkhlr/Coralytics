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
  buildTopicHighlightMap,
  buildTrunkHighlightMeshes,
  formatCoralHoverTooltip,
  pickCoralHoverTarget,
  type CoralHoverTarget,
} from "../three/coralTopicHighlight";
import { coralSilhouette } from "../three/generators/coralSilhouette";
import type { OrganismData, OrganismGenerator } from "../three/organismTypes";

const defaultGenerator: OrganismGenerator = coralSilhouette;

export type OrganismViewportHandle = {
  exportPng: () => string | null;
};

type OrganismViewportProps = {
  data: OrganismData;
  dataSource?: "analysis" | "sample";
  appearance?: "light" | "dark";
  isLoading?: boolean;
  onBranchClick?: (topicName: string) => void;
  generator?: OrganismGenerator;
};

export const OrganismViewport = forwardRef<OrganismViewportHandle, OrganismViewportProps>(
  function OrganismViewport(
    { data, dataSource = "analysis", appearance = "light", isLoading = false, onBranchClick, generator = defaultGenerator },
    ref,
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
      exportPng: () => {
        const renderer = rendererRef.current;
        if (!renderer) return null;
        return renderer.domElement.toDataURL("image/png");
      },
    }));

    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;

      const isDark = appearance === "dark";

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(isDark ? "#06243b" : "#bfe0f2");
      scene.fog = new THREE.Fog(
        isDark ? "#06243b" : "#8eb8d4",
        isDark ? 8 : 12,
        isDark ? 22 : 28,
      );

      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
      camera.position.set(3.8, 2.6, 5.4);
      camera.lookAt(0, 1.1, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight(
        isDark ? "#0c3654" : "#7fb0cc",
        isDark ? 0.5 : 0.85,
      );
      const hemiLight = new THREE.HemisphereLight(
        isDark ? "#3a9bc4" : "#d8effa",
        isDark ? "#020a14" : "#2f5a74",
        isDark ? 0.55 : 0.75,
      );
      const keyLight = new THREE.DirectionalLight(isDark ? "#bce4ff" : "#ffffff", isDark ? 2.6 : 3.1);
      keyLight.position.set(2, 8, 4);
      const fillLight = new THREE.DirectionalLight(isDark ? "#4a90b8" : "#a8d4ea", 0.55);
      fillLight.position.set(-4, 2, -3);
      scene.add(ambientLight, hemiLight, keyLight, fillLight);

      const sandGeometry = new THREE.CircleGeometry(4.2, 48);
      const sandMaterial = new THREE.MeshStandardMaterial({
        color: isDark ? "#13334a" : "#7fa6bd",
        roughness: 0.95,
        metalness: 0,
      });
      const sand = new THREE.Mesh(sandGeometry, sandMaterial);
      sand.rotation.x = -Math.PI / 2;
      sand.position.y = -0.03;
      scene.add(sand);

      const { coral, cleanup } = generator(scene, data);
      const topicMeshes = buildTopicHighlightMap(coral);
      const trunkMeshes = buildTrunkHighlightMeshes(coral);
      let hoveredTarget: CoralHoverTarget | null = null;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;
      controls.target.set(0, 1.1, 0);
      controls.minDistance = 3.2;
      controls.maxDistance = 10;
      controls.maxPolarAngle = Math.PI * 0.52;

      const resize = () => {
        const { clientWidth, clientHeight } = host;
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      const observer = new ResizeObserver(resize);
      observer.observe(host);
      resize();

      let frameId = 0;

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const updatePointer = (event: MouseEvent) => {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      const pickTarget = (): CoralHoverTarget | null => {
        raycaster.setFromCamera(pointer, camera);
        return pickCoralHoverTarget(coral, raycaster);
      };

      const setHoveredTarget = (target: CoralHoverTarget | null) => {
        const prevKey =
          hoveredTarget?.kind === "topic"
            ? `topic:${hoveredTarget.name}`
            : hoveredTarget?.kind === "trunk"
              ? "trunk"
              : null;
        const nextKey =
          target?.kind === "topic"
            ? `topic:${target.name}`
            : target?.kind === "trunk"
              ? "trunk"
              : null;
        if (prevKey === nextKey) return;

        hoveredTarget = target;
        applyCoralHoverHighlight(topicMeshes, trunkMeshes, hoveredTarget);

        const tooltip = tooltipRef.current;
        if (!tooltip) return;

        const text = formatCoralHoverTooltip(hoveredTarget);
        if (text) {
          tooltip.textContent = text;
          tooltip.hidden = false;
        } else {
          tooltip.textContent = "";
          tooltip.hidden = true;
        }
      };

      const handlePointerMove = (event: MouseEvent) => {
        updatePointer(event);
        const target = pickTarget();
        setHoveredTarget(target);
        renderer.domElement.style.cursor =
          target?.kind === "topic" ? "pointer" : "grab";
      };

      const handlePointerLeave = () => {
        setHoveredTarget(null);
        renderer.domElement.style.cursor = "grab";
      };

      const handleClick = (event: MouseEvent) => {
        if (!onBranchClick) return;
        updatePointer(event);
        const target = pickTarget();
        if (target?.kind === "topic") onBranchClick(target.name);
      };

      renderer.domElement.addEventListener("pointermove", handlePointerMove);
      renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.addEventListener("click", handleClick);
      renderer.domElement.style.cursor = "grab";

      const render = () => {
        frameId = window.requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
      };
      render();

      return () => {
        window.cancelAnimationFrame(frameId);
        renderer.domElement.removeEventListener("pointermove", handlePointerMove);
        renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
        renderer.domElement.removeEventListener("click", handleClick);
        renderer.domElement.style.cursor = "";
        applyCoralHoverHighlight(topicMeshes, trunkMeshes, null);
        observer.disconnect();
        controls.dispose();
        cleanup();
        sandGeometry.dispose();
        sandMaterial.dispose();
        renderer.dispose();
        rendererRef.current = null;
        host.removeChild(renderer.domElement);
      };
    }, [data, onBranchClick, appearance, generator]);

    return (
      <div className="organism-viewport-wrapper">
        <div
          className={`organism-viewport${isLoading ? " organism-viewport--loading" : ""}`}
          ref={hostRef}
        >
          {isLoading ? (
            <div className="viewport-overlay" role="status" aria-live="polite">
              Loading coral…
            </div>
          ) : null}
          <div ref={tooltipRef} className="viewport-tooltip" hidden aria-live="polite" />
          {dataSource !== "sample" ? (
            <div className="viewport-label">
              {data.topics.length} topic{data.topics.length === 1 ? "" : "s"} · stem =
              account history · branches = topics
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
