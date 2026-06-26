import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { coralV3 } from "../three/generators/coralV3";
import type { OrganismData, OrganismGenerator } from "../three/organismTypes";

const useGenerator: OrganismGenerator = coralV3;

const clock = new THREE.Clock();
const pulseSpeed = 1.2;
const bendAmountMax = 0.3;

type OrganismViewportProps = {
  data: OrganismData;
  dataSource?: "analysis" | "sample";
  isLoading?: boolean;
};

export function OrganismViewport({
  data,
  dataSource = "analysis",
  isLoading = false,
}: OrganismViewportProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#f9fbfc");

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(4, 3, 6);
    camera.lookAt(0, 0.6, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 1.4);
    const keyLight = new THREE.DirectionalLight("#ffffff", 2);
    keyLight.position.set(3, 5, 4);
    scene.add(ambientLight, keyLight);

    const grid = new THREE.GridHelper(6, 12, "#cbd5db", "#e3e9ed");
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
    controls.enablePan = true;

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      controls.update();

      const elapsed = clock.getElapsedTime();
      const pulse = (Math.sin(elapsed * pulseSpeed) + 1) / 2;

      const ud = coral.userData as {
        tentacleData?: {
          geometry: THREE.BufferGeometry;
          original: Float32Array;
          angle: number;
        }[];
        tentacleHeight?: number;
      };

      const tentacleData = ud.tentacleData;
      if (tentacleData && ud.tentacleHeight) {
        const tentacleHeight = ud.tentacleHeight;
        const vertex = new THREE.Vector3();

        for (const { geometry, original, angle } of tentacleData) {
          const pos = geometry.attributes.position as THREE.BufferAttribute;

          for (let i = 0; i < pos.count; i++) {
            vertex.fromArray(original, i * 3);
            const t = (vertex.y + tentacleHeight / 2) / tentacleHeight;
            const bend = bendAmountMax * pulse * t;
            vertex.x += Math.cos(angle) * bend;
            vertex.z += Math.sin(angle) * bend;
            pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
          }

          pos.needsUpdate = true;
          geometry.computeVertexNormals();
        }
      }

      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.dispose();
      cleanup();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, [data]);

  const label =
    dataSource === "sample"
      ? "Sample coral — upload & analyze to personalize"
      : `${data.topics.length} topic${data.topics.length === 1 ? "" : "s"} · drag to orbit`;

  return (
    <div className={`organism-viewport${isLoading ? " organism-viewport--loading" : ""}`} ref={hostRef}>
      {isLoading ? (
        <div className="viewport-overlay" role="status" aria-live="polite">
          Loading coral…
        </div>
      ) : null}
      <div className="viewport-label">{label}</div>
    </div>
  );
}
