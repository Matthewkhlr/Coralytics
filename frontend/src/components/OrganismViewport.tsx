import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { coralV1 } from "../three/generators/coralV1";
import { coralV2 } from "../three/generators/coralV2";
import { coralV3 } from "../three/generators/coralV3";
import type { OrganismData, OrganismGenerator } from "../three/organismTypes";

const useGenerator: OrganismGenerator = coralV3;

const clock = new THREE.Clock();

const pulseSpeed = 1.2; 
const pulseAmplitude = 0.3; 

const bendAmountMax = 0.3;

const sampleOrganismData: OrganismData = {
  accountAgeDays: 1240,
  topics: [
    { name: "tech", postVolume: 82, sentiment: 0.6 },
    { name: "career", postVolume: 44, sentiment: 0.3 },
    { name: "social", postVolume: 31, sentiment: -0.1 },
  ],
};

export function OrganismViewport() {
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

    const { coral, cleanup } = useGenerator(scene, sampleOrganismData);

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
    //controls.enableRotate =true; //default
    //controls.enableZoom = true; //default

    const render = () => {
      frameId = window.requestAnimationFrame(render);
      controls.update();

      //rotation logic
      //coral.rotation.y += 0.01;
      //coral.rotation.y+=0.01;

      const elapsed = clock.getElapsedTime();
      const pulse = (Math.sin(elapsed * pulseSpeed) + 1) / 2; 

      //pulse tentacles
      const ud = (coral as any).userData;
      const tentacleData = ud?.tentacleData as
        | { geometry: THREE.BufferGeometry; original: Float32Array; angle: number }[]
        | undefined;

      if (tentacleData && ud.tentacleHeight) {
        const tentacleHeight = ud.tentacleHeight as number;
        for (const { geometry, original, angle } of tentacleData) {
          const pos = geometry.attributes.position as THREE.BufferAttribute;
          const vertex =  new THREE.Vector3();

          for (let i=0; i<pos.count; i++) {
            //start from original (straight) position
            vertex.fromArray(original, i*3);

            //y from bottom to top
            const t = (vertex.y + tentacleHeight / 2) / tentacleHeight; //0 at base, 1 at tip

            //bend stronger near tip, scaled by pulse
            const bend = bendAmountMax * pulse * t;

            //outward directon in XZ based on ring angle
            vertex.x += Math.cos(angle) * bend;
            vertex.z += Math.sin(angle) * bend;
            
            pos.setXYZ(i, vertex.x, vertex.y, vertex.z);

          }
          pos.needsUpdate = true;
          geometry.computeVertexNormals();
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      cleanup();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="organism-viewport" ref={hostRef}>
      <div className="viewport-label">Three.js scene ready</div>
    </div>
  );
}
