// Underwater reef scene (WebGPU / TSL) for the landing hero.
import * as THREE from "three/webgpu";
import {
  Fn,
  If,
  uniform,
  float,
  vec2,
  vec3,
  vec4,
  positionWorld,
  positionGeometry,
  time,
  sin,
  cos,
  mix,
  smoothstep,
  hash,
  mx_noise_float,
  sqrt,
  fract,
  uv,
  instanceIndex,
  cameraViewMatrix,
  rotate,
  pass,
  saturation,
  hue,
  texture,
} from "three/tsl";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GrassNoodles } from "./GrassNoodles.js";
import { ProceduralCaustics } from "./ProceduralCaustics.js";
import { PathFollow } from "./PathFollow.js";

// Same asset as the original clownfish GLB
const FISH_URL =
  "https://rrzvgzjttmyseqsmmyvn.supabase.co/storage/v1/object/public/published/underwater-corals-scene-vubwxk/assets/clownfish.glb";

// `hueShift` (radians) rotates the hue of each model's baked texture so the
// rendered corals don't reproduce the source assets' colours.
const coralDefs = [
  { id: "redCoral", url: "https://omma.build/api/m/89a1d0f2-8ed9-474b-af94-ca372d50c46d.glb", hueShift: 2.2 },
  { id: "vibrantAcropora", url: "https://omma.build/api/m/78d505e8-b5a7-4713-9a37-4af389dcb5c4.glb", hueShift: -1.4 },
  { id: "yellowOrangeCoral", url: "https://omma.build/api/m/ba7f0725-6f08-499d-a1a1-e602ca9ff2a9.glb", hueShift: 1.7 },
  { id: "brainCoral", url: "https://omma.build/api/m/f7097382-0650-4d99-9e81-575c74f9c5d6.glb", hueShift: 2.9 },
];

function buildParams(isDark, lowPower) {
  return {
    fov: 33,
    exposure: 1,
    saturation: isDark ? 1.9 : 1.5,
    fogColor: isDark ? "#06243b" : "#5f9cc4",
    fogNear: isDark ? 1 : 3,
    fogFar: isDark ? 20 : 32,
    bgColorTop: isDark ? "#01040a" : "#bfe0f2",
    bgColorBottom: isDark ? "#072a44" : "#4d8cb4",
    sunColor: isDark ? "#bce4ff" : "#ffffff",
    sunIntensity: isDark ? 3.4 : 4.2,
    sunAngle: 0.55,
    sunPenumbra: 0.8,
    sunPos: [0, 14, 5],
    ambientColor: isDark ? "#0c3654" : "#7fb0cc",
    ambientIntensity: isDark ? 0.45 : 0.9,
    hemiSkyColor: isDark ? "#3a9bc4" : "#bfe2f5",
    hemiGroundColor: isDark ? "#020a14" : "#2f5a74",
    hemiIntensity: isDark ? 0.55 : 0.8,
    causticColor: "#8ec8ee",
    causticStrength: 2.35,
    causticFrequency: 4,
    causticSpeed: 1.1,
    causticBaseBrightness: isDark ? 0.75 : 0.95,
    sandColorA: isDark ? "#13334a" : "#7fa6bd",
    sandColorB: isDark ? "#04121e" : "#436e88",
    sandRoughness: 0.95,
    sandNoiseScale: 0.45,
    grassCount: lowPower ? 6e3 : 10e3,
    grassDensity: 0.1,
    grassFieldSize: 11,
    grassRadius: 5.5,
    grassBladeWidth: 1,
    grassBladeHeight: 1.8,
    grassStiffness: 0.15,
    grassDamping: 0.02,
    grassDrag: 5,
    grassBuoyancy: 0.34,
    grassGravity: 0.12,
    grassTipMass: 1.74,
    grassFlowAmplitude: 2,
    grassFlowFrequency: 0.12,
    grassFlowSpeed: 0.3,
    grassFlowPhaseOffset: 0.22,
    grassFlowVerticalAmplitude: 0,
    grassWaveAmplitude: 0,
    grassWaveSpeed: 0.3,
    grassWavePhasePerJoint: 1,
    grassSelfRight: 0.5,
    grassTiltAmplitude: 0.79,
    grassBaseColor: isDark ? "#04141e" : "#0e3040",
    grassTipColor: isDark ? "#4f74b0" : "#5f8cc8",
    grassColorVariation: 0.95,
    grassGradientFalloff: 3.19,
    grassGradientOffset: 0.33,
    grassRoughness: 0.8,
    grassTipGlow: "#ffd8e0",
    grassTipGlowIntensity: 0.2,
    grassTipGlowStart: 0.75,
    grassTipGlowFalloff: 1.35,
    grassEmissiveNoiseAmp: 0.36,
    grassEmissiveNoiseFrequency: 130.9,
    grassSpeckleAmp: 1.37,
    grassSpeckleFrequency: 290.1,
    grassSpeckleThreshold: 0.644,
    grassPushRadius: 2,
    mousePushStrength: 4,
    grassPushRecovery: 0.3,
    raycastPlaneY: 1.22,
    fishScale: 1.6,
    fishPathSpeed: 0.04,
    fishPathOffset: 0.0979,
    wiggleAmplitude: 0.03,
    wiggleFrequency: 1.07,
    fishColliderRadiusScale: 0.63,
    particleCount: lowPower ? 600 : 1.2e3,
    particleSizeMin: 0.01,
    particleSizeMax: 0.015,
    particleSpeed: 0.3,
    particleColor: "#cfe9ff",
    particleOpacity: isDark ? 0.8 : 0.55,
    particleStretchMin: 1,
    particleStretchMax: 3,
    particleGranule: 1,
    particleEdge: 0.125,
    particleLighting: 1,
    particleVolumeXZ: 16,
    particleVolumeY: 6.5,
    particleVolumeYBase: 0.2,
    pathPoints: [
      [0.83, 0.9, -2.37],
      [-0.92, 0.9, 0],
      [1.41, 0.9, 1.7],
      [-1.5, 0.9, 2.58],
      [-2.95, 0.9, 0.54],
      [-1.79, 0.9, -2.35],
    ],
    // Layout mirrored/reordered vs the source demo, with per-coral rotation
    // and non-uniform stretch so sizes and silhouettes read differently.
    corals: {
      yellowOrangeCoral: {
        pos: [2.55, 0, -2.95],
        scale: 4.5,
        rotY: 1.9,
        stretch: [0.9, 1.18, 0.9],
        colliderRadius: 0.43,
      },
      redCoral: {
        pos: [-2.75, 0.95, -1.55],
        scale: 2.15,
        rotY: 2.6,
        stretch: [1.12, 0.85, 1.05],
        colliderRadius: 0.43,
      },
      vibrantAcropora: {
        pos: [3.05, 0.3, 1.95],
        scale: 2.05,
        rotY: 4.1,
        stretch: [1.15, 0.92, 0.95],
        colliderRadius: 0.5,
      },
      brainCoral: {
        pos: [-2.95, 0.15, 0.55],
        scale: 2.75,
        rotY: 1.2,
        stretch: [1.06, 0.78, 1.06],
        colliderRadius: 0.6,
      },
    },
  };
}

export async function createReefScene(
  host,
  { isDark = true, ambient = false, scenic = false, frozen = false } = {},
) {
  const lowPower =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.innerWidth < 768 ||
    (navigator.hardwareConcurrency ?? 8) <= 4;
  const params = buildParams(isDark, lowPower);
  if (ambient) {
    // Calmer, cheaper backdrop variant (e.g. behind the upload flow):
    // fewer blades/particles, softer caustics, no fish, no interaction.
    params.grassCount = lowPower ? 3e3 : 5e3;
    params.particleCount = lowPower ? 300 : 600;
    params.causticStrength = 1.6;
    params.causticSpeed = 0.8;
  }
  if (scenic) {
    params.causticStrength = Math.max(params.causticStrength, 1.9);
    params.particleCount = lowPower ? 450 : 900;
  }
  let disposed = false;

  // Start remote model downloads immediately. Previously they only began
  // after WebGPU and the procedural scene had finished initializing.
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  // Ambient backdrops (e.g. the upload page) are just sand, grass and light —
  // no corals, no fish.
  const coralLoads = new Map(
    ambient && !scenic ? [] : coralDefs.map((def) => [def.id, gltfLoader.loadAsync(def.url)]),
  );
  const fishLoad = ambient ? null : gltfLoader.loadAsync(FISH_URL);

  const renderer = new THREE.WebGPURenderer({
    antialias: !lowPower,
    requiredLimits: { maxStorageBuffersInVertexStage: 2 },
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1));
  renderer.setSize(host.clientWidth || 1, host.clientHeight || 1);
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.toneMappingExposure = params.exposure;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.pointerEvents = ambient ? "none" : "auto";
  renderer.domElement.style.touchAction = "none";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  renderer.domElement.style.display = "block";
  host.appendChild(renderer.domElement);
  await renderer.init();
  if (disposed) {
    renderer.dispose();
    renderer.domElement.remove();
    return () => {};
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(params.fogColor, params.fogNear, params.fogFar);

  const camera = new THREE.PerspectiveCamera(
    params.fov,
    (host.clientWidth || 1) / (host.clientHeight || 1),
    0.1,
    100,
  );
  // Default view: wide hero framing — brain coral lower-left, purple tube
  // coral upper-right, with the clownfish swim path centered in frame.
  camera.position.set(0.35, 1.6, 7.1);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  // Target at the fish's swim height (y ≈ 0.9) keeps it centered
  controls.target.set(-0.1, 0.9, 0);
  controls.minDistance = 5.5;
  // Keep zoom-out short of the fog wall so colours stay saturated
  controls.maxDistance = 10;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.enablePan = false;
  controls.update();
  if (ambient) {
    // No user orbit — just a very slow drift so the backdrop feels alive.
    // Frozen backdrops must not drift at all.
    controls.enabled = false;
    controls.autoRotate = !frozen;
    controls.autoRotateSpeed = 0.12;
  }

  const saturationU = uniform(params.saturation);
  const postProcessing = new THREE.PostProcessing(renderer);
  const scenePass = pass(scene, camera);
  postProcessing.outputNode = saturation(scenePass, saturationU);

  /* ---- gradient background plane pinned to the camera ---- */
  const bgCanvas = document.createElement("canvas");
  bgCanvas.width = 2;
  bgCanvas.height = 512;
  const bgCtx = bgCanvas.getContext("2d");
  const bgTexture = new THREE.CanvasTexture(bgCanvas);
  bgTexture.colorSpace = THREE.SRGBColorSpace;
  const grad = bgCtx.createLinearGradient(0, 0, 0, bgCanvas.height);
  grad.addColorStop(0, params.bgColorBottom);
  grad.addColorStop(1, params.bgColorTop);
  bgCtx.fillStyle = grad;
  bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);
  bgTexture.needsUpdate = true;
  const bgMaterial = new THREE.MeshBasicNodeMaterial({ map: bgTexture, fog: false, depthWrite: false });
  const bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bgMaterial);
  bgMesh.frustumCulled = false;
  bgMesh.renderOrder = -1;
  camera.add(bgMesh);
  scene.add(camera);
  const updateBackgroundPlane = () => {
    const depth = 22;
    bgMesh.position.z = -depth;
    const h = 2 * depth * Math.tan((camera.fov * Math.PI) / 360);
    const w = h * camera.aspect;
    bgMesh.scale.set(w, h, 1);
  };
  updateBackgroundPlane();

  /* ---- lights ---- */
  const ambientLight = new THREE.AmbientLight(params.ambientColor, params.ambientIntensity);
  scene.add(ambientLight);
  const hemi = new THREE.HemisphereLight(params.hemiSkyColor, params.hemiGroundColor, params.hemiIntensity);
  scene.add(hemi);
  const sun = new THREE.SpotLight(params.sunColor, params.sunIntensity, 0, params.sunAngle, params.sunPenumbra, 0);
  sun.position.set(...params.sunPos);
  sun.target.position.set(0, 0, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.setScalar(lowPower ? 256 : 512);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 30;
  sun.shadow.bias = -5e-4;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 4;
  scene.add(sun);
  scene.add(sun.target);

  const proceduralCaustics = new ProceduralCaustics(renderer, {
    color: params.causticColor,
    strength: params.causticStrength,
    frequency: params.causticFrequency,
    speed: params.causticSpeed,
    baseBrightness: params.causticBaseBrightness,
  });
  sun.map = proceduralCaustics.texture;

  /* ---- sandy floor ---- */
  const sandColorAU = uniform(new THREE.Color(params.sandColorA));
  const sandColorBU = uniform(new THREE.Color(params.sandColorB));
  const sandNoiseScaleU = uniform(params.sandNoiseScale);
  const sandBaseColor = Fn(() => {
    const p = positionWorld.xz.mul(sandNoiseScaleU);
    const n1 = mx_noise_float(vec3(p.x, float(0), p.y)).mul(0.5).add(0.5);
    const n2 = mx_noise_float(vec3(p.x.mul(3.2), float(7), p.y.mul(3.2))).mul(0.5).add(0.5);
    const n = n1.mul(0.65).add(n2.mul(0.35));
    return mix(sandColorBU, sandColorAU, n);
  })();
  const sandMat = new THREE.MeshStandardNodeMaterial({ roughness: params.sandRoughness, metalness: 0 });
  sandMat.colorNode = sandBaseColor;
  const sandFloor = new THREE.Mesh(new THREE.CircleGeometry(40, 96), sandMat);
  sandFloor.rotation.x = -Math.PI / 2;
  sandFloor.receiveShadow = true;
  scene.add(sandFloor);

  /* ---- anemone grass ---- */
  const jointsPerBlade = lowPower ? 5 : 6;
  const bladeRadius = 0.05;
  const tubeGeo = new THREE.CapsuleGeometry(
    bladeRadius,
    1 - 2 * bladeRadius,
    2,
    lowPower ? 3 : 4,
    jointsPerBlade + 1,
  );
  tubeGeo.translate(0, 0.5, 0);

  // Vertical mask ramping toward the blade tip — drives the tip glow.
  const tipMaskCanvas = document.createElement("canvas");
  tipMaskCanvas.width = 4;
  tipMaskCanvas.height = 256;
  const tipMaskCtx = tipMaskCanvas.getContext("2d");
  {
    const start = params.grassTipGlowStart;
    const falloff = params.grassTipGlowFalloff;
    const w = tipMaskCanvas.width;
    const h = tipMaskCanvas.height;
    const image = tipMaskCtx.createImageData(w, h);
    for (let y = 0; y < h; y++) {
      const t = 1 - y / (h - 1);
      let mask = 0;
      if (t > start) mask = ((t - start) / (1 - start)) ** falloff;
      const v = Math.round(Math.min(Math.max(mask, 0), 1) * 255);
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        image.data[i] = v;
        image.data[i + 1] = v;
        image.data[i + 2] = v;
        image.data[i + 3] = 255;
      }
    }
    tipMaskCtx.putImageData(image, 0, 0);
  }
  const tipMaskTex = new THREE.CanvasTexture(tipMaskCanvas);
  tipMaskTex.colorSpace = THREE.NoColorSpace;
  tipMaskTex.minFilter = THREE.LinearFilter;
  tipMaskTex.magFilter = THREE.LinearFilter;

  const grassMaterial = new THREE.MeshPhysicalNodeMaterial({
    side: THREE.FrontSide,
    roughness: params.grassRoughness,
    metalness: 0,
    emissive: new THREE.Color(params.grassTipGlow),
    emissiveIntensity: params.grassTipGlowIntensity,
    emissiveMap: tipMaskTex,
  });

  // Ambient backdrops skip the grass — its swaying pink-tipped noodles read
  // as coral, and the upload backdrop should be just sand and light.
  const grass = ambient
    ? null
    : new GrassNoodles(renderer, {
    bladeCount: params.grassCount,
    jointsPerBlade,
    density: params.grassDensity,
    gridFieldSize: params.grassFieldSize,
    bladeWidth: params.grassBladeWidth,
    bladeHeight: params.grassBladeHeight,
    stiffness: params.grassStiffness,
    damping: params.grassDamping,
    drag: params.grassDrag,
    buoyancy: params.grassBuoyancy,
    gravity: params.grassGravity,
    tipMass: params.grassTipMass,
    flowAmplitude: params.grassFlowAmplitude,
    flowFrequency: params.grassFlowFrequency,
    flowSpeed: params.grassFlowSpeed,
    flowPhaseOffset: params.grassFlowPhaseOffset,
    flowVerticalAmplitude: params.grassFlowVerticalAmplitude,
    waveAmplitude: params.grassWaveAmplitude,
    waveSpeed: params.grassWaveSpeed,
    wavePhasePerJoint: params.grassWavePhasePerJoint,
    selfRight: params.grassSelfRight,
    tiltAmplitude: params.grassTiltAmplitude,
    bladeBaseColor: params.grassBaseColor,
    bladeTipColor: params.grassTipColor,
    bladeColorVariation: params.grassColorVariation,
    bladeGradientFalloff: params.grassGradientFalloff,
    bladeGradientOffset: params.grassGradientOffset,
    bladeGeometry: tubeGeo,
    material: grassMaterial,
    pushRadius: params.grassPushRadius,
    pushStrengths: [params.mousePushStrength],
    colliderTypes: ["push", "collision"],
    pushRecovery: params.grassPushRecovery,
    positioningNode: (idx) => {
      const cols = 175;
      const col = idx.mod(cols);
      const row = idx.div(cols);
      const jx = hash(idx).sub(0.5);
      const jz = hash(idx.add(7919)).sub(0.5);
      const wx = col.toFloat().add(jx).div(float(cols)).sub(0.5).mul(params.grassFieldSize);
      const wz = row.toFloat().add(jz).div(float(cols)).sub(0.5).mul(params.grassFieldSize);
      const dist = sqrt(wx.mul(wx).add(wz.mul(wz)));
      const edgeNoise = mx_noise_float(vec3(wx.mul(0.22).add(11), float(0), wz.mul(0.22).add(11))).mul(0.5).add(0.5);
      const maxR = float(params.grassRadius).add(edgeNoise.sub(0.5).mul(float(params.grassRadius).mul(0.35)));
      const isShown = float(1).sub(smoothstep(maxR.sub(float(params.grassRadius).mul(0.2)), maxR, dist));
      return { wx, wz, isShown };
    },
  });
  if (grass) {
    grass.init();
    // Thousands of animated grass shadows dominate GPU time while adding
    // little to the final image; coral and fish still cast scene shadows.
    grass.mesh.castShadow = false;
    grass.mesh.receiveShadow = false;
    scene.add(grass.group);
  }

  const grassEmissiveColorU = uniform(new THREE.Color(params.grassTipGlow));
  const grassEmissiveIntensityU = uniform(params.grassTipGlowIntensity);
  const grassEmissiveNoiseAmpU = uniform(params.grassEmissiveNoiseAmp);
  const grassEmissiveNoiseFreqU = uniform(params.grassEmissiveNoiseFrequency);
  const grassSpeckleAmpU = uniform(params.grassSpeckleAmp);
  const grassSpeckleFreqU = uniform(params.grassSpeckleFrequency);
  const grassSpeckleThresholdU = uniform(params.grassSpeckleThreshold);
  grassMaterial.emissiveNode = Fn(() => {
    const mask = texture(tipMaskTex).r;
    const baseGlow = grassEmissiveColorU.mul(grassEmissiveIntensityU).mul(mask);
    const instOffset = hash(instanceIndex).mul(100);
    const np = positionGeometry.mul(grassEmissiveNoiseFreqU).add(instOffset);
    const n = mx_noise_float(np).mul(0.5).add(0.5);
    const noiseMod = mix(float(1), n, grassEmissiveNoiseAmpU);
    const baseEmissive = baseGlow.mul(noiseMod);
    const spOffset = hash(instanceIndex.add(31)).mul(100);
    const sp = positionGeometry.mul(grassSpeckleFreqU).add(spOffset);
    const spNoise = mx_noise_float(sp).mul(0.5).add(0.5);
    const speckleMask = smoothstep(grassSpeckleThresholdU, float(1), spNoise);
    const speckleEmissive = grassEmissiveColorU
      .mul(grassEmissiveIntensityU)
      .mul(speckleMask)
      .mul(grassSpeckleAmpU);
    return baseEmissive.add(speckleEmissive);
  })();

  /* ---- floating plankton sprites ---- */
  const particleSpeedU = uniform(params.particleSpeed);
  const particleColorU = uniform(new THREE.Color(params.particleColor));
  const particleOpacityU = uniform(params.particleOpacity);
  const particleVolumeXZU = uniform(params.particleVolumeXZ);
  const particleVolumeYU = uniform(params.particleVolumeY);
  const particleVolumeYBaseU = uniform(params.particleVolumeYBase);
  const pSeedX = hash(instanceIndex.add(101));
  const pSeedY = hash(instanceIndex.add(202));
  const pSeedZ = hash(instanceIndex.add(303));
  const pSeedR = hash(instanceIndex.add(404));
  const pSeedS = hash(instanceIndex.add(505));
  const pSeedH = hash(instanceIndex.add(606));
  const pSeedT = hash(instanceIndex.add(707));
  const particleMaterial = new THREE.SpriteNodeMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  particleMaterial.positionNode = Fn(() => {
    const t = time.mul(particleSpeedU);
    const baseX = pSeedX.sub(0.5).mul(particleVolumeXZU);
    const baseZ = pSeedZ.sub(0.5).mul(particleVolumeXZU);
    const swayX = sin(t.mul(0.7).add(pSeedX.mul(10))).mul(0.6);
    const swayZ = cos(t.mul(0.5).add(pSeedZ.mul(10))).mul(0.6);
    const fallY = fract(pSeedY.add(t.mul(0.04))).mul(particleVolumeYU).add(particleVolumeYBaseU);
    return vec3(baseX.add(swayX), fallY, baseZ.add(swayZ));
  })();
  particleMaterial.scaleNode = Fn(() => {
    const w = mix(float(params.particleSizeMin), float(params.particleSizeMax), pSeedS);
    const stretch = mix(float(params.particleStretchMin), float(params.particleStretchMax), pSeedT);
    return vec2(w, w.mul(stretch));
  })();
  const pRotation = pSeedR.mul(Math.PI * 2);
  particleMaterial.rotationNode = pRotation;
  particleMaterial.opacityNode = Fn(() => {
    const p = uv().sub(0.5);
    const r = p.length();
    const haloInner = float(0.5).sub(float(params.particleEdge));
    const halo = smoothstep(float(0.5), haloInner, r).mul(0.5);
    const core = smoothstep(float(0.2), float(0), r).mul(0.7);
    const body = halo.add(core);
    const granule = mx_noise_float(vec3(uv().mul(7), float(0))).mul(0.5).add(0.5);
    const speckled = mix(float(1).sub(float(params.particleGranule)), float(1), granule);
    return body.mul(speckled).mul(particleOpacityU);
  })();
  particleMaterial.colorNode = Fn(() => {
    const hueShift = pSeedH.sub(0.5).mul(0.3);
    const base = particleColorU.add(vec3(hueShift.negate(), hueShift.mul(0.5), float(0)));
    const viewUpXY = cameraViewMatrix.mul(vec4(0, 1, 0, 0)).xy.normalize();
    const upInUV = rotate(viewUpXY, pRotation.negate());
    const topness = uv().sub(0.5).dot(upInUV).mul(2).add(0.5).clamp(0, 1);
    const lightFactor = mix(float(1).sub(float(params.particleLighting)), float(1), topness);
    return base.mul(lightFactor);
  })();
  const particles = new THREE.Sprite(particleMaterial);
  particles.count = params.particleCount;
  particles.frustumCulled = false;
  scene.add(particles);

  /* ---- fish on a wiggle path ---- */
  const fishGroup = new THREE.Group();
  scene.add(fishGroup);
  let fishPivot = null;
  let pathFollow = null;

  const buildWigglePath = () => {
    const stops = params.pathPoints.map((p) => new THREE.Vector3(...p));
    const guide = new THREE.CatmullRomCurve3(stops, true);
    const totalLength = guide.getLength();
    const N = 300;
    const samples = [];
    const tangents = [];
    for (let i = 0; i < N; i++) {
      const u = i / N;
      samples.push(guide.getPointAt(u));
      tangents.push(guide.getTangentAt(u));
    }
    const perp = new THREE.Vector3();
    for (let i = 0; i < N; i++) {
      const arcPos = (i / N) * totalLength;
      const offset = Math.sin(arcPos * 2 * Math.PI * params.wiggleFrequency) * params.wiggleAmplitude;
      const tan = tangents[i];
      perp.set(-tan.z, 0, tan.x).normalize();
      samples[i].addScaledVector(perp, offset);
    }
    return samples;
  };

  const loadFish = async () => {
    const gltf = await fishLoad;
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim > 0) model.scale.multiplyScalar(1 / maxDim);
    model.updateMatrixWorld(true);
    const orientedSize = new THREE.Box3().setFromObject(model).getSize(new THREE.Vector3());
    const axes = ["x", "y", "z"];
    const longestAxis = axes.reduce((a, b) => (orientedSize[b] > orientedSize[a] ? b : a));
    if (longestAxis === "z") model.rotation.y = Math.PI / 2;
    else if (longestAxis === "y") model.rotation.z = Math.PI / 2;
    model.quaternion.premultiply(
      new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI),
    );
    model.updateMatrixWorld(true);
    const centerBox = new THREE.Box3().setFromObject(model);
    const center = centerBox.getCenter(new THREE.Vector3());
    model.position.sub(center);
    model.updateMatrixWorld(true);
    const meshes = [];
    model.traverse((child) => {
      if (child.isMesh && child.geometry) {
        child.updateMatrixWorld(true);
        child.geometry.applyMatrix4(child.matrixWorld);
        child.geometry.computeBoundingBox();
        child.geometry.computeVertexNormals();
        child.castShadow = true;
        child.receiveShadow = true;

        // PathFollow needs NodeMaterials; keep texture / force warm orange base
        const src = child.material;
        const nodeMat = new THREE.MeshStandardNodeMaterial({
          color: src?.map ? new THREE.Color(0xffffff) : new THREE.Color("#f58220"),
          map: src?.map ?? null,
          roughness: src?.roughness ?? 0.55,
          metalness: src?.metalness ?? 0.05,
          side: src?.side ?? THREE.FrontSide,
        });
        if (src?.map) {
          src.map.colorSpace = THREE.SRGBColorSpace;
          nodeMat.map = src.map;
        } else if (src?.color) {
          // Prefer an orange body if the baked color is washed out / gray
          const c = src.color;
          const isGrayish = Math.abs(c.r - c.g) < 0.08 && Math.abs(c.g - c.b) < 0.08;
          nodeMat.color.set(isGrayish ? "#f58220" : c);
        }
        child.material = nodeMat;
        meshes.push(child);
      }
    });
    const fishMesh = new THREE.Group();
    for (const mesh of meshes) {
      mesh.parent?.remove(mesh);
      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);
      mesh.updateMatrix();
      fishMesh.add(mesh);
    }
    const pivot = new THREE.Group();
    pivot.add(fishMesh);
    fishGroup.add(pivot);
    fishPivot = pivot;
    pathFollow = new PathFollow({
      points: buildWigglePath(),
      samples: 256,
      closed: true,
      flow: true,
    });
    pathFollow.pathOffset.value = params.fishPathOffset;
    pathFollow.setBoundsFromObject(fishMesh);
    for (const mesh of meshes) pathFollow.applyTo(mesh);

    // Capsule collider (data only; no debug mesh) so the fish pushes grass.
    const colliderBox = new THREE.Box3();
    for (const mesh of meshes) {
      if (mesh.geometry?.boundingBox) colliderBox.union(mesh.geometry.boundingBox);
    }
    const colliderSize = colliderBox.getSize(new THREE.Vector3());
    const baseRadius = (Math.max(colliderSize.y, colliderSize.z) / 2) * 1.1;
    pivot.userData.colliderRadius = baseRadius * params.fishColliderRadiusScale;
    pivot.scale.setScalar(params.fishScale);
    return pivot;
  };

  /* ---- distant whales for scenic page backdrops ---- */
  const whales = [];
  const whaleGroup = new THREE.Group();
  scene.add(whaleGroup);

  const makeWhale = ({ scale = 1, color = "#315f78" } = {}) => {
    const whale = new THREE.Group();
    whale.scale.setScalar(scale);

    const bodyMat = new THREE.MeshStandardNodeMaterial({
      color: new THREE.Color(color),
      roughness: 0.72,
      metalness: 0,
    });
    const bellyMat = new THREE.MeshStandardNodeMaterial({
      color: new THREE.Color("#8fb2c0"),
      roughness: 0.82,
      metalness: 0,
    });

    const body = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 18), bodyMat);
    body.scale.set(1.75, 0.48, 0.52);
    body.castShadow = true;
    body.receiveShadow = true;
    whale.add(body);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.64, 24, 14), bodyMat);
    head.position.set(1.08, 0.02, 0);
    head.scale.set(0.9, 0.68, 0.74);
    head.castShadow = true;
    whale.add(head);

    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.62, 24, 12), bellyMat);
    belly.position.set(0.28, -0.18, 0);
    belly.scale.set(1.35, 0.18, 0.5);
    whale.add(belly);

    const tailStem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.38, 1.05, 16), bodyMat);
    tailStem.position.set(-1.2, 0, 0);
    tailStem.rotation.z = Math.PI / 2;
    tailStem.scale.set(0.72, 1, 0.72);
    tailStem.castShadow = true;
    whale.add(tailStem);

    const flukeGeo = new THREE.ConeGeometry(0.34, 0.85, 3);
    const flukeLeft = new THREE.Mesh(flukeGeo, bodyMat);
    flukeLeft.position.set(-1.82, 0.08, 0.26);
    flukeLeft.rotation.set(Math.PI / 2, 0, -0.75);
    flukeLeft.scale.set(1, 0.42, 0.52);
    whale.add(flukeLeft);

    const flukeRight = flukeLeft.clone();
    flukeRight.position.z = -0.26;
    flukeRight.rotation.z = 0.75;
    whale.add(flukeRight);

    const finGeo = new THREE.ConeGeometry(0.24, 0.85, 3);
    const finLeft = new THREE.Mesh(finGeo, bodyMat);
    finLeft.position.set(0.18, -0.1, 0.55);
    finLeft.rotation.set(1.15, 0.1, -0.85);
    finLeft.scale.set(0.9, 0.32, 0.7);
    whale.add(finLeft);

    const finRight = finLeft.clone();
    finRight.position.z = -0.55;
    finRight.rotation.z = 0.85;
    whale.add(finRight);

    const dorsal = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.55, 3), bodyMat);
    dorsal.position.set(-0.18, 0.42, 0);
    dorsal.rotation.set(0, 0, Math.PI);
    dorsal.scale.set(0.65, 0.7, 0.55);
    whale.add(dorsal);

    return whale;
  };

  const createWhales = () => {
    const defs = [
      { scale: 0.95, radiusX: 7.8, radiusZ: 3.2, y: 2.8, z: -3.2, speed: 0.045, phase: 0.1, color: "#2c5c76" },
      { scale: 0.62, radiusX: 8.7, radiusZ: 2.5, y: 3.8, z: -5.0, speed: 0.032, phase: 2.3, color: "#244b63" },
      { scale: 0.48, radiusX: 7.2, radiusZ: 2.0, y: 2.25, z: -4.1, speed: 0.055, phase: 4.1, color: "#3d7085" },
    ];
    defs.forEach((def) => {
      const mesh = makeWhale(def);
      whaleGroup.add(mesh);
      whales.push({ mesh, ...def });
    });
  };

  if (scenic) createWhales();

  /* ---- corals ---- */
  const coralsGroup = new THREE.Group();
  coralsGroup.visible = false;
  scene.add(coralsGroup);
  const coralInstances = [];
  const CORAL_COLLIDER_SLOT_START = 2;
  const coralWorldPos = new THREE.Vector3();

  const coralColliderRadius = (conf) =>
    conf.colliderRadius * conf.scale * Math.max(...(conf.stretch ?? [1, 1, 1]));

  const applyCoralTransform = (inst) => {
    const conf = params.corals[inst.id];
    const stretch = conf.stretch ?? [1, 1, 1];
    inst.pivot.position.set(...conf.pos);
    inst.pivot.rotation.y = conf.rotY ?? 0;
    inst.pivot.scale.set(
      conf.scale * stretch[0],
      conf.scale * stretch[1],
      conf.scale * stretch[2],
    );
    inst.pivot.updateMatrixWorld(true);
    if (!grass) return;
    coralWorldPos.copy(inst.localSphereCenter).applyMatrix4(inst.pivot.matrixWorld);
    const slot = grass.colliders[inst.slotIdx];
    slot.position.copy(coralWorldPos);
    slot.endpoint.copy(coralWorldPos);
    slot.radius = coralColliderRadius(conf);
  };

  // Download and prepare a coral, but don't attach it yet — the caller adds
  // all corals in the same frame so none pops in ahead of the others.
  const prepareCoral = async (def, slotIdx) => {
    const pivot = new THREE.Group();
    coralsGroup.add(pivot);
    if (grass) grass.colliders[slotIdx].type = "collision";
    const inst = {
      id: def.id,
      pivot,
      slotIdx,
      localSphereCenter: new THREE.Vector3(0, 0.5, 0),
    };
    coralInstances.push(inst);
    applyCoralTransform(inst);
    try {
      const gltf = await coralLoads.get(def.id);
      const model = gltf.scene;
      const hueShift = def.hueShift ?? 0;
      model.traverse((obj) => {
        if (obj.isMesh) {
          obj.castShadow = true;
          obj.receiveShadow = true;

          // Rotate the hue of the baked texture / base colour.
          const src = Array.isArray(obj.material) ? obj.material[0] : obj.material;
          const mat = new THREE.MeshStandardNodeMaterial({
            roughness: src?.roughness ?? 0.8,
            metalness: 0,
          });
          if (src?.map) {
            mat.colorNode = hue(texture(src.map), float(hueShift));
          } else {
            const c = (src?.color ?? new THREE.Color("#c96")).clone();
            const hsl = { h: 0, s: 0, l: 0 };
            c.getHSL(hsl);
            c.setHSL((hsl.h + hueShift / (Math.PI * 2) + 1) % 1, hsl.s, hsl.l);
            mat.color = c;
          }
          obj.material = mat;
        }
      });
      return () => {
        pivot.add(model);
        pivot.updateMatrixWorld(true);
        const localBox = new THREE.Box3().setFromObject(model);
        const localSphere = localBox.getBoundingSphere(new THREE.Sphere());
        const invPivot = new THREE.Matrix4().copy(pivot.matrixWorld).invert();
        localSphere.center.applyMatrix4(invPivot);
        inst.localSphereCenter.copy(localSphere.center);
        applyCoralTransform(inst);
      };
    } catch (err) {
      console.warn(`Failed to load coral model ${def.id}:`, err);
      return null;
    }
  };

  if (!ambient || scenic) {
    Promise.all(
      coralDefs.map((def, i) => prepareCoral(def, CORAL_COLLIDER_SLOT_START + i)),
    ).then((attachFns) => {
      if (disposed) return;
      for (const attach of attachFns) attach?.();
      // Reveal the completed set as one unit on the next rendered frame.
      coralsGroup.visible = true;
    });
  }
  if (!ambient) {
    loadFish().catch((err) => console.warn("Failed to load fish model:", err));
  }

  /* ---- mouse push (raycast against a horizontal plane) ---- */
  const raycaster = new THREE.Raycaster();
  const mouseNDC = new THREE.Vector2();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -params.raycastPlaneY);
  const mouseHitPoint = new THREE.Vector3();
  const PUSH_AWAY = new THREE.Vector3(99999, 0, 99999);
  let mouseOverCanvas = false;
  const handlePointerMove = (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    if (nx < -1 || nx > 1 || ny < -1 || ny > 1) {
      mouseOverCanvas = false;
      return;
    }
    mouseNDC.set(nx, ny);
    raycaster.setFromCamera(mouseNDC, camera);
    if (raycaster.ray.intersectPlane(groundPlane, mouseHitPoint)) {
      mouseOverCanvas = true;
    }
  };
  if (!ambient) window.addEventListener("pointermove", handlePointerMove);

  /* ---- resize ---- */
  let resumeAfterResize = null;
  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    updateBackgroundPlane();
    resumeAfterResize?.();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  if (grass) await renderer.computeAsync(grass.computeInit);

  /* ---- animation loop ---- */
  const capsuleA = new THREE.Vector3();
  const capsuleB = new THREE.Vector3();
  let fishPathOffset = params.fishPathOffset;
  let lastT = performance.now() * 1e-3;
  // Frozen backdrops render a short warm-up (grass settles, caustics bake)
  // and then stop the loop entirely, leaving a static image.
  let framesLeft = frozen ? 45 : Infinity;
  const renderFrame = () => {
    if (document.hidden) return;

    if (framesLeft <= 0) {
      renderer.setAnimationLoop(null);
      return;
    }
    framesLeft--;

    const now = performance.now() * 1e-3;
    const dt = Math.min(0.1, now - lastT);
    lastT = now;

    controls.update();

    if (pathFollow) {
      fishPathOffset = (fishPathOffset + dt * params.fishPathSpeed + 1) % 1;
      pathFollow.pathOffset.value = fishPathOffset;
    }

    for (const whale of whales) {
      whale.phase = (whale.phase + dt * whale.speed) % 1;
      const a = whale.phase * Math.PI * 2;
      const x = Math.cos(a) * whale.radiusX;
      const z = whale.z + Math.sin(a) * whale.radiusZ;
      const y = whale.y + Math.sin(a * 2 + whale.scale) * 0.16;
      whale.mesh.position.set(x, y, z);
      whale.mesh.rotation.y = -a + Math.PI / 2;
      whale.mesh.rotation.z = Math.sin(a * 2.4) * 0.035;
    }

    if (grass) {
      if (mouseOverCanvas) {
        grass.colliders[0].position.copy(mouseHitPoint);
      } else {
        grass.colliders[0].position.copy(PUSH_AWAY);
      }
    }

    if (grass && fishPivot && pathFollow) {
      const curve = pathFollow.curve;
      const segment = pathFollow.pathSegment.value;
      const headT = (((fishPathOffset + segment) % 1) + 1) % 1;
      const tailT = ((fishPathOffset % 1) + 1) % 1;
      fishPivot.updateMatrixWorld(true);
      curve.getPointAt(tailT, capsuleA).applyMatrix4(fishPivot.matrixWorld);
      curve.getPointAt(headT, capsuleB).applyMatrix4(fishPivot.matrixWorld);
      grass.colliders[1].position.copy(capsuleA);
      grass.colliders[1].endpoint.copy(capsuleB);
      grass.colliders[1].radius = fishPivot.userData.colliderRadius * fishPivot.scale.x;
    }

    grass?.update();

    if (grass) {
      for (const inst of coralInstances) {
        inst.pivot.updateMatrixWorld(true);
        coralWorldPos.copy(inst.localSphereCenter).applyMatrix4(inst.pivot.matrixWorld);
        const conf = params.corals[inst.id];
        const slot = grass.colliders[inst.slotIdx];
        slot.position.copy(coralWorldPos);
        slot.endpoint.copy(coralWorldPos);
        slot.radius = coralColliderRadius(conf);
      }
    }

    if (sun.map) proceduralCaustics.update();
    // Frozen backdrops run the warm-up sim off-screen (grass settles,
    // caustics bake) and present only the final still frame, so the user
    // never sees any motion.
    if (!frozen || framesLeft === 0) postProcessing.render();
  };
  renderer.setAnimationLoop(renderFrame);
  if (frozen) {
    resumeAfterResize = () => {
      if (disposed) return;
      framesLeft = Math.max(framesLeft, 1);
      renderer.setAnimationLoop(renderFrame);
    };
  }

  return () => {
    disposed = true;
    renderer.setAnimationLoop(null);
    controls.dispose();
    window.removeEventListener("pointermove", handlePointerMove);
    observer.disconnect();
    proceduralCaustics.dispose();
    bgTexture.dispose();
    tipMaskTex.dispose();
    scene.traverse((obj) => {
      if (obj.isMesh || obj.isSprite) {
        obj.geometry?.dispose?.();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
        else m?.dispose?.();
      }
    });
    renderer.dispose();
    renderer.domElement.remove();
  };
}
