import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { coralV4 } from "../three/generators/coralV4";
import type { OrganismData, OrganismGenerator } from "../three/organismTypes";

const useGenerator: OrganismGenerator = coralV4;
const CAMERA_Y = 3;

export type OrganismViewportHandle = {
  exportPng: () => string | null;
};

type OrganismViewportProps = {
  data: OrganismData;
  dataSource?: "analysis" | "sample";
  appearance?: "light" | "dark";
  isLoading?: boolean;
  onBranchClick?: (topicName: string) => void;
};

export const OrganismViewport = forwardRef<OrganismViewportHandle, OrganismViewportProps>(
  function OrganismViewport(
    { data, dataSource = "analysis", appearance = "light", isLoading = false, onBranchClick },
    ref,
  ) {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

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
      scene.background = new THREE.Color(isDark ? "#071828" : "#f9fbfc");

      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(4, CAMERA_Y, 6);
      camera.lookAt(0, 0.6, 0);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      host.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const ambientLight = new THREE.AmbientLight("#ffffff", 1.4);
      const keyLight = new THREE.DirectionalLight("#ffffff", 2);
      keyLight.position.set(3, 5, 4);
      scene.add(ambientLight, keyLight);

      const grid = new THREE.GridHelper(
        6,
        12,
        isDark ? "#1a4a58" : "#cbd5db",
        isDark ? "#0e3040" : "#e3e9ed",
      );
      grid.position.y = -1.2;
      scene.add(grid);

      const { coral, cleanup } = useGenerator(scene, data);

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
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;

      const raycaster = new THREE.Raycaster();
      const pointer = new THREE.Vector2();

      const handleClick = (event: MouseEvent) => {
        if (!onBranchClick) return;
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(coral.children, true);
        for (const hit of hits) {
          let current: THREE.Object3D | null = hit.object;
          while (current) {
            const topicName = current.userData?.topicName as string | undefined;
            if (topicName) {
              onBranchClick(topicName);
              return;
            }
            current = current.parent;
          }
        }
      };

      renderer.domElement.addEventListener("click", handleClick);

      const render = () => {
        frameId = window.requestAnimationFrame(render);
        controls.update();
        renderer.render(scene, camera);
      };
      render();

      return () => {
        window.cancelAnimationFrame(frameId);
        renderer.domElement.removeEventListener("click", handleClick);
        observer.disconnect();
        controls.dispose();
        cleanup();
        renderer.dispose();
        rendererRef.current = null;
        host.removeChild(renderer.domElement);
      };
    }, [data, onBranchClick, appearance]);

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
          {dataSource !== "sample" ? (
            <div className="viewport-label">
              {data.topics.length} topic{data.topics.length === 1 ? "" : "s"} · click branches to
              explore
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
