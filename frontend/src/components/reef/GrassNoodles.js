import * as THREE from "three/webgpu";
import { StorageBufferAttribute } from "three/webgpu";
import {
  Fn,
  uniform,
  float,
  vec3,
  vec4,
  instancedArray,
  instanceIndex,
  If,
  Loop,
  storage,
  uv,
  texture,
  positionGeometry,
  normalGeometry,
  mix,
  smoothstep,
  sqrt,
  sin,
  cos,
  hash,
  deltaTime,
  time,
  mx_noise_float,
  length,
  max,
  min,
  normalize,
  cross,
  select,
  pow,
  clamp,
  fract,
  PI
} from "three/tsl";
export var GrassNoodles = class _GrassNoodles {
  // Maximum simultaneous colliders. Each slot is either a 'push' (soft
  // radial impulse) or 'collision' (hard capsule projection); see the
  // `colliders` array on each instance. Inactive slots stay parked at
  // (99999, 0, 99999) with zero radius and strength.
  static MAX_COLLIDERS = 10;
  // Spatial grid over the blade field XZ — per-blade collider culling.
  // Each cell stores up to MAX_PER_CELL collider indices (with sentinel
  // MAX_COLLIDERS for empty slots, which dereferences to a zero-radius
  // "null" entry so per-iteration math collapses to a no-op).
  static GRID_RES = 32;
  static MAX_PER_CELL = 4;
  // Private uniform nodes
  #bladeWidthU;
  #bladeHeightU;
  #segmentLengthU;
  #stiffnessU;
  #dampingU;
  #dragU;
  #pushRadiusU;
  #pushScaleU;
  #pushRecoveryU;
  #colliderPositionsU;
  #colliderEndpointsU;
  #colliderStrengthsU;
  #colliderRadiiU;
  #colliderTypesU;
  #densityU;
  #bladeColorVariationU;
  #bladeGradientFalloffU;
  #bladeGradientOffsetU;
  #bladeBaseColorU;
  #bladeTipColorU;
  #buoyancyU;
  #gravityU;
  #tipMassU;
  #flowAmplitudeU;
  #flowFrequencyU;
  #flowSpeedU;
  #flowPhaseOffsetU;
  #flowVerticalAmplitudeU;
  #waveAmplitudeU;
  #waveSpeedU;
  #wavePhasePerJointU;
  #selfRightU;
  #tiltAmplitudeU;
  #emissiveNoiseScaleU;
  #emissiveNoiseStrengthU;
  #speckleScaleU;
  #speckleIntensityU;
  #speckleThresholdU;
  // Private state
  #renderer;
  #bladeCount;
  #jointsPerBlade;
  #segmentsPerBlade;
  #positioningNode;
  #bladeGeometry;
  #materialOverride;
  #computeUpdate;
  #computeInit;
  // Spatial grid (CPU-built, GPU-consumed each frame)
  #gridFieldSize;
  #colliderGridArr;
  #colliderGridAttr;
  #colliderGridStorage;
  #colliderDataArr;
  #colliderDataAttr;
  #colliderDataStorage;
  // Public state
  bladeData;
  bladeIsShown;
  positions;
  prevPositions;
  group = new THREE.Group();
  mesh;
  material;
  constructor(renderer2, settings = {}) {
    this.#renderer = renderer2;
    this.#bladeCount = settings.bladeCount ?? 3e4;
    this.#jointsPerBlade = settings.jointsPerBlade ?? 6;
    this.#segmentsPerBlade = this.#jointsPerBlade - 1;
    this.bladeData = instancedArray(this.#bladeCount, "vec4");
    this.bladeIsShown = instancedArray(this.#bladeCount, "float");
    const totalJoints = this.#bladeCount * this.#jointsPerBlade;
    this.positions = instancedArray(totalJoints, "vec4");
    this.prevPositions = instancedArray(totalJoints, "vec4");
    this.#bladeWidthU = uniform(settings.bladeWidth ?? 1);
    this.#bladeHeightU = uniform(settings.bladeHeight ?? 1.6);
    this.#segmentLengthU = uniform(settings.segmentLength ?? 1 / this.#segmentsPerBlade);
    this.#stiffnessU = uniform(settings.stiffness ?? 0.5);
    this.#dampingU = uniform(settings.damping ?? 0.08);
    this.#dragU = uniform(settings.drag ?? 0);
    this.#pushRadiusU = uniform(settings.pushRadius ?? 3);
    this.#pushScaleU = uniform(settings.pushScale ?? 1);
    this.#pushRecoveryU = uniform(settings.pushRecovery ?? 1.5);
    const initialStrength = settings.pushStrength ?? 1.5;
    this.#colliderPositionsU = [];
    this.#colliderEndpointsU = [];
    this.#colliderStrengthsU = [];
    this.#colliderRadiiU = [];
    this.#colliderTypesU = [];
    this.colliders = [];
    for (let i = 0; i < _GrassNoodles.MAX_COLLIDERS; i++) {
      const posU = uniform(new THREE.Vector3(99999, 0, 99999));
      const endU = uniform(new THREE.Vector3(99999, 0, 99999));
      const strU = uniform(settings.pushStrengths?.[i] ?? initialStrength);
      const radU = uniform(settings.colliderRadii?.[i] ?? 0);
      const typU = uniform(settings.colliderTypes?.[i] === "collision" ? 1 : 0);
      this.#colliderPositionsU.push(posU);
      this.#colliderEndpointsU.push(endU);
      this.#colliderStrengthsU.push(strU);
      this.#colliderRadiiU.push(radU);
      this.#colliderTypesU.push(typU);
      this.colliders.push({
        get type() {
          return typU.value === 1 ? "collision" : "push";
        },
        set type(v) {
          typU.value = v === "collision" ? 1 : 0;
        },
        get position() {
          return posU.value;
        },
        get endpoint() {
          return endU.value;
        },
        get strength() {
          return strU.value;
        },
        set strength(v) {
          strU.value = v;
        },
        get radius() {
          return radU.value;
        },
        set radius(v) {
          radU.value = v;
        }
      });
    }
    this.#buoyancyU = uniform(settings.buoyancy ?? 0);
    this.#gravityU = uniform(settings.gravity ?? 0);
    this.#tipMassU = uniform(settings.tipMass ?? 1);
    this.#flowAmplitudeU = uniform(settings.flowAmplitude ?? 0);
    this.#flowFrequencyU = uniform(settings.flowFrequency ?? 0.15);
    this.#flowSpeedU = uniform(settings.flowSpeed ?? 0.3);
    this.#flowPhaseOffsetU = uniform(settings.flowPhaseOffset ?? 0.4);
    this.#flowVerticalAmplitudeU = uniform(settings.flowVerticalAmplitude ?? 0);
    this.#waveAmplitudeU = uniform(settings.waveAmplitude ?? 0);
    this.#waveSpeedU = uniform(settings.waveSpeed ?? 0.3);
    this.#wavePhasePerJointU = uniform(settings.wavePhasePerJoint ?? 1);
    this.#selfRightU = uniform(settings.selfRight ?? 0);
    this.#tiltAmplitudeU = uniform(settings.tiltAmplitude ?? 0);
    this.#densityU = uniform(settings.density ?? 1);
    this.#bladeColorVariationU = uniform(settings.bladeColorVariation ?? 0.9);
    this.#bladeGradientFalloffU = uniform(settings.bladeGradientFalloff ?? 1.6);
    this.#bladeGradientOffsetU = uniform(settings.bladeGradientOffset ?? 0);
    this.#bladeBaseColorU = uniform(new THREE.Color(settings.bladeBaseColor ?? "#0a2030"));
    this.#bladeTipColorU = uniform(new THREE.Color(settings.bladeTipColor ?? "#3c7986"));
    this.#emissiveNoiseScaleU = uniform(settings.emissiveNoiseScale ?? 12);
    this.#emissiveNoiseStrengthU = uniform(settings.emissiveNoiseStrength ?? 0.7);
    this.#speckleScaleU = uniform(settings.speckleScale ?? 40);
    this.#speckleIntensityU = uniform(settings.speckleIntensity ?? 0.4);
    this.#speckleThresholdU = uniform(settings.speckleThreshold ?? 0.7);
    this.#positioningNode = settings.positioningNode;
    this.#bladeGeometry = settings.bladeGeometry;
    this.#materialOverride = settings.material;
    this.#gridFieldSize = settings.gridFieldSize ?? 24;
    const cellCount = _GrassNoodles.GRID_RES * _GrassNoodles.GRID_RES;
    const totalGridSlots = cellCount * _GrassNoodles.MAX_PER_CELL;
    this.#colliderGridArr = new Uint32Array(totalGridSlots).fill(_GrassNoodles.MAX_COLLIDERS);
    this.#colliderGridAttr = new StorageBufferAttribute(this.#colliderGridArr, 1);
    this.#colliderGridStorage = storage(this.#colliderGridAttr, "uint", totalGridSlots);
    const dataEntries = _GrassNoodles.MAX_COLLIDERS + 1;
    this.#colliderDataArr = new Float32Array(dataEntries * 3 * 4);
    this.#colliderDataAttr = new StorageBufferAttribute(this.#colliderDataArr, 4);
    this.#colliderDataStorage = storage(this.#colliderDataAttr, "vec4", dataEntries * 3);
  }
  // ─── Spatial grid rebuild (CPU → storage buffer) ──────────────────────────
  #rebuildColliderGrid() {
    const NULL_IDX = _GrassNoodles.MAX_COLLIDERS;
    const data = this.#colliderDataArr;
    const grid = this.#colliderGridArr;
    for (let c = 0; c < _GrassNoodles.MAX_COLLIDERS; c++) {
      const off = c * 12;
      const pos = this.#colliderPositionsU[c].value;
      const end = this.#colliderEndpointsU[c].value;
      data[off + 0] = pos.x;
      data[off + 1] = pos.y;
      data[off + 2] = pos.z;
      data[off + 3] = this.#colliderRadiiU[c].value;
      data[off + 4] = end.x;
      data[off + 5] = end.y;
      data[off + 6] = end.z;
      data[off + 7] = this.#colliderStrengthsU[c].value;
      data[off + 8] = this.#colliderTypesU[c].value;
      data[off + 9] = 0;
      data[off + 10] = 0;
      data[off + 11] = 0;
    }
    const nullOff = NULL_IDX * 12;
    data[nullOff + 0] = 99999;
    data[nullOff + 1] = 0;
    data[nullOff + 2] = 99999;
    data[nullOff + 3] = 0;
    data[nullOff + 4] = 99999;
    data[nullOff + 5] = 0;
    data[nullOff + 6] = 99999;
    data[nullOff + 7] = 0;
    data[nullOff + 8] = 0;
    data[nullOff + 9] = 0;
    data[nullOff + 10] = 0;
    data[nullOff + 11] = 0;
    this.#colliderDataAttr.needsUpdate = true;
    grid.fill(NULL_IDX);
    const RES = _GrassNoodles.GRID_RES;
    const MAX_PER_CELL = _GrassNoodles.MAX_PER_CELL;
    const fieldSize = this.#gridFieldSize;
    const half = fieldSize / 2;
    const cellSize = fieldSize / RES;
    const pushRadius = this.#pushRadiusU.value;
    const margin = this.#bladeHeightU.value;
    for (let c = 0; c < _GrassNoodles.MAX_COLLIDERS; c++) {
      const pos = this.#colliderPositionsU[c].value;
      const end = this.#colliderEndpointsU[c].value;
      const radius = this.#colliderRadiiU[c].value;
      const type = this.#colliderTypesU[c].value;
      const isCollision = type === 1;
      const reach = isCollision ? radius : pushRadius;
      if (reach <= 0) continue;
      if (Math.abs(pos.x) > 9e3 || Math.abs(pos.z) > 9e3) continue;
      let minX, maxX, minZ, maxZ;
      if (isCollision) {
        minX = Math.min(pos.x, end.x) - radius;
        maxX = Math.max(pos.x, end.x) + radius;
        minZ = Math.min(pos.z, end.z) - radius;
        maxZ = Math.max(pos.z, end.z) + radius;
      } else {
        minX = pos.x - pushRadius;
        maxX = pos.x + pushRadius;
        minZ = pos.z - pushRadius;
        maxZ = pos.z + pushRadius;
      }
      minX -= margin;
      maxX += margin;
      minZ -= margin;
      maxZ += margin;
      if (maxX < -half || minX > half || maxZ < -half || minZ > half) continue;
      const cxMin = Math.max(0, Math.floor((minX + half) / cellSize));
      const cxMax = Math.min(RES - 1, Math.floor((maxX + half) / cellSize));
      const czMin = Math.max(0, Math.floor((minZ + half) / cellSize));
      const czMax = Math.min(RES - 1, Math.floor((maxZ + half) / cellSize));
      for (let cz = czMin; cz <= czMax; cz++) {
        for (let cx = cxMin; cx <= cxMax; cx++) {
          const baseIdx = (cz * RES + cx) * MAX_PER_CELL;
          for (let k = 0; k < MAX_PER_CELL; k++) {
            if (grid[baseIdx + k] === NULL_IDX) {
              grid[baseIdx + k] = c;
              break;
            }
          }
        }
      }
    }
    this.#colliderGridAttr.needsUpdate = true;
  }
  // ─── Property getters/setters ──────────────────────────────────────────────
  get jointsPerBlade() {
    return this.#jointsPerBlade;
  }
  get bladeCount() {
    return this.#bladeCount;
  }
  get bladeWidth() {
    return this.#bladeWidthU.value;
  }
  set bladeWidth(v) {
    this.#bladeWidthU.value = v;
  }
  get bladeHeight() {
    return this.#bladeHeightU.value;
  }
  set bladeHeight(v) {
    this.#bladeHeightU.value = v;
  }
  get stiffness() {
    return this.#stiffnessU.value;
  }
  set stiffness(v) {
    this.#stiffnessU.value = v;
  }
  get damping() {
    return this.#dampingU.value;
  }
  set damping(v) {
    this.#dampingU.value = v;
  }
  get drag() {
    return this.#dragU.value;
  }
  set drag(v) {
    this.#dragU.value = v;
  }
  get pushRadius() {
    return this.#pushRadiusU.value;
  }
  set pushRadius(v) {
    this.#pushRadiusU.value = v;
  }
  get pushScale() {
    return this.#pushScaleU.value;
  }
  set pushScale(v) {
    this.#pushScaleU.value = v;
  }
  get pushRecovery() {
    return this.#pushRecoveryU.value;
  }
  set pushRecovery(v) {
    this.#pushRecoveryU.value = v;
  }
  get buoyancy() {
    return this.#buoyancyU.value;
  }
  set buoyancy(v) {
    this.#buoyancyU.value = v;
  }
  get gravity() {
    return this.#gravityU.value;
  }
  set gravity(v) {
    this.#gravityU.value = v;
  }
  get tipMass() {
    return this.#tipMassU.value;
  }
  set tipMass(v) {
    this.#tipMassU.value = v;
  }
  get flowAmplitude() {
    return this.#flowAmplitudeU.value;
  }
  set flowAmplitude(v) {
    this.#flowAmplitudeU.value = v;
  }
  get flowFrequency() {
    return this.#flowFrequencyU.value;
  }
  set flowFrequency(v) {
    this.#flowFrequencyU.value = v;
  }
  get flowSpeed() {
    return this.#flowSpeedU.value;
  }
  set flowSpeed(v) {
    this.#flowSpeedU.value = v;
  }
  get flowPhaseOffset() {
    return this.#flowPhaseOffsetU.value;
  }
  set flowPhaseOffset(v) {
    this.#flowPhaseOffsetU.value = v;
  }
  get flowVerticalAmplitude() {
    return this.#flowVerticalAmplitudeU.value;
  }
  set flowVerticalAmplitude(v) {
    this.#flowVerticalAmplitudeU.value = v;
  }
  get waveAmplitude() {
    return this.#waveAmplitudeU.value;
  }
  set waveAmplitude(v) {
    this.#waveAmplitudeU.value = v;
  }
  get waveSpeed() {
    return this.#waveSpeedU.value;
  }
  set waveSpeed(v) {
    this.#waveSpeedU.value = v;
  }
  get wavePhasePerJoint() {
    return this.#wavePhasePerJointU.value;
  }
  set wavePhasePerJoint(v) {
    this.#wavePhasePerJointU.value = v;
  }
  get selfRight() {
    return this.#selfRightU.value;
  }
  set selfRight(v) {
    this.#selfRightU.value = v;
  }
  get tiltAmplitude() {
    return this.#tiltAmplitudeU.value;
  }
  set tiltAmplitude(v) {
    this.#tiltAmplitudeU.value = v;
  }
  get density() {
    return this.#densityU.value;
  }
  set density(v) {
    this.#densityU.value = v;
  }
  get bladeColorVariation() {
    return this.#bladeColorVariationU.value;
  }
  set bladeColorVariation(v) {
    this.#bladeColorVariationU.value = v;
  }
  get bladeGradientFalloff() {
    return this.#bladeGradientFalloffU.value;
  }
  set bladeGradientFalloff(v) {
    this.#bladeGradientFalloffU.value = v;
  }
  get bladeGradientOffset() {
    return this.#bladeGradientOffsetU.value;
  }
  set bladeGradientOffset(v) {
    this.#bladeGradientOffsetU.value = v;
  }
  get bladeBaseColor() {
    return `#${this.#bladeBaseColorU.value.getHexString()}`;
  }
  set bladeBaseColor(v) {
    this.#bladeBaseColorU.value.set(v);
  }
  get bladeTipColor() {
    return `#${this.#bladeTipColorU.value.getHexString()}`;
  }
  set bladeTipColor(v) {
    this.#bladeTipColorU.value.set(v);
  }
  get emissiveNoiseStrength() {
    return this.#emissiveNoiseStrengthU.value;
  }
  set emissiveNoiseStrength(v) {
    this.#emissiveNoiseStrengthU.value = v;
  }
  get emissiveNoiseScale() {
    return this.#emissiveNoiseScaleU.value;
  }
  set emissiveNoiseScale(v) {
    this.#emissiveNoiseScaleU.value = v;
  }
  get speckleScale() {
    return this.#speckleScaleU.value;
  }
  set speckleScale(v) {
    this.#speckleScaleU.value = v;
  }
  get speckleIntensity() {
    return this.#speckleIntensityU.value;
  }
  set speckleIntensity(v) {
    this.#speckleIntensityU.value = v;
  }
  get speckleThreshold() {
    return this.#speckleThresholdU.value;
  }
  set speckleThreshold(v) {
    this.#speckleThresholdU.value = v;
  }
  get computeInit() {
    return this.#computeInit;
  }
  // ─── Init ──────────────────────────────────────────────────────────────────
  init() {
    this.#createMaterial();
    this.#createMesh();
    this.#createComputeInit();
    this.#createComputeUpdate();
    return this;
  }
  update() {
    this.#rebuildColliderGrid();
    this.#renderer.compute(this.#computeUpdate);
  }
  // ─── Base geometry ─────────────────────────────────────────────────────────
  #createBladeGeometry() {
    const r = 0.05;
    const h = 1 - 2 * r;
    const geo = new THREE.CapsuleGeometry(r, h, 6, 8, 8);
    geo.translate(0, 0.5, 0);
    return geo;
  }
  // ─── Material (vertex shader follows the joint chain) ─────────────────────
  #createMaterial() {
    this.material = this.#materialOverride ?? new THREE.MeshStandardNodeMaterial({
      side: THREE.FrontSide,
      roughness: 0.75,
      metalness: 0.05
    });
    const positions = this.positions;
    const bladeData = this.bladeData;
    const bladeIsShown = this.bladeIsShown;
    const jointsPerBlade2 = this.#jointsPerBlade;
    const segmentsPerBlade = this.#segmentsPerBlade;
    const bladeWidthU = this.#bladeWidthU;
    this.material.positionNode = Fn(() => {
      const shown = bladeIsShown.element(instanceIndex);
      const t = positionGeometry.y.saturate().mul(float(segmentsPerBlade));
      const segF = t.floor().min(float(segmentsPerBlade - 1));
      const segT = t.sub(segF);
      const segI = segF.toInt();
      const baseJointIdx = instanceIndex.mul(jointsPerBlade2);
      const jointAIdx = baseJointIdx.add(segI);
      const jointBIdx = jointAIdx.add(1);
      const jointPrevIdx = baseJointIdx.add(segI.sub(1).max(0));
      const jointNextIdx = baseJointIdx.add(segI.add(2).min(jointsPerBlade2 - 1));
      const jointA = positions.element(jointAIdx).xyz;
      const jointB = positions.element(jointBIdx).xyz;
      const jointPrev = positions.element(jointPrevIdx).xyz;
      const jointNext = positions.element(jointNextIdx).xyz;
      const spine = mix(jointA, jointB, segT);
      const tangentA = normalize(jointB.sub(jointPrev));
      const tangentB = normalize(jointNext.sub(jointA));
      const segDir = normalize(mix(tangentA, tangentB, segT));
      const ref = vec3(1, 0, 0);
      const right = normalize(cross(segDir, ref));
      const fwd = normalize(cross(right, segDir));
      const radialScale = bladeWidthU;
      const offset = right.mul(positionGeometry.x.mul(radialScale)).add(fwd.mul(positionGeometry.z.mul(radialScale)));
      const finalPos = spine.add(offset);
      return finalPos.mul(shown);
    })();
    this.material.normalNode = Fn(() => {
      const t = positionGeometry.y.saturate().mul(float(segmentsPerBlade));
      const segF = t.floor().min(float(segmentsPerBlade - 1));
      const segT = t.sub(segF);
      const segI = segF.toInt();
      const baseJointIdx = instanceIndex.mul(jointsPerBlade2);
      const jointAIdx = baseJointIdx.add(segI);
      const jointBIdx = jointAIdx.add(1);
      const jointPrevIdx = baseJointIdx.add(segI.sub(1).max(0));
      const jointNextIdx = baseJointIdx.add(segI.add(2).min(jointsPerBlade2 - 1));
      const jointA = positions.element(jointAIdx).xyz;
      const jointB = positions.element(jointBIdx).xyz;
      const jointPrev = positions.element(jointPrevIdx).xyz;
      const jointNext = positions.element(jointNextIdx).xyz;
      const tangentA = normalize(jointB.sub(jointPrev));
      const tangentB = normalize(jointNext.sub(jointA));
      const segDir = normalize(mix(tangentA, tangentB, segT));
      const ref = vec3(1, 0, 0);
      const right = normalize(cross(segDir, ref));
      const fwd = normalize(cross(right, segDir));
      const n = normalGeometry;
      return normalize(right.mul(n.x).add(segDir.mul(n.y)).add(fwd.mul(n.z)));
    })();
    this.material.colorNode = Fn(() => {
      const t = positionGeometry.y.saturate();
      const clump = bladeData.element(instanceIndex).w.saturate();
      const shifted = t.sub(this.#bladeGradientOffsetU).div(float(1).sub(this.#bladeGradientOffsetU).max(1e-3)).clamp(0, 1);
      const gradient = pow(shifted, this.#bladeGradientFalloffU);
      const tipMix = float(1).sub(this.#bladeColorVariationU).add(clump.mul(this.#bladeColorVariationU));
      const variedTip = mix(this.#bladeBaseColorU, this.#bladeTipColorU, tipMix);
      return mix(this.#bladeBaseColorU, variedTip, gradient);
    })();
    if (this.material.emissiveMap) {
      const emissiveMap = this.material.emissiveMap;
      const emissiveColorU = uniform(this.material.emissive);
      const emissiveIntensityU = uniform(this.material.emissiveIntensity);
      this._emissiveColorU = emissiveColorU;
      this._emissiveIntensityU = emissiveIntensityU;
      this.material.emissiveNode = Fn(() => {
        const mask = texture(emissiveMap, uv()).r;
        const t2 = positionGeometry.y.saturate().mul(float(segmentsPerBlade));
        const segF2 = t2.floor().min(float(segmentsPerBlade - 1));
        const segT2 = t2.sub(segF2);
        const segI2 = segF2.toInt();
        const baseJointIdx2 = instanceIndex.mul(jointsPerBlade2);
        const jointA2 = positions.element(baseJointIdx2.add(segI2)).xyz;
        const jointB2 = positions.element(baseJointIdx2.add(segI2).add(1)).xyz;
        const spine2 = mix(jointA2, jointB2, segT2);
        const bladeHash2 = hash(instanceIndex).mul(100);
        const emNoiseStrU = this.#emissiveNoiseStrengthU;
        const noiseCoord2 = spine2.mul(this.#emissiveNoiseScaleU).add(vec3(bladeHash2, float(0), bladeHash2.mul(0.7)));
        const rawNoise = mx_noise_float(noiseCoord2.add(vec3(113.7, 47.3, 83.1))).mul(0.5).add(0.5);
        const noiseVal = mix(float(1), rawNoise, emNoiseStrU);
        const cellCoord = spine2.mul(this.#speckleScaleU).add(vec3(bladeHash2.mul(1.3), bladeHash2.mul(0.9), bladeHash2.mul(1.7)));
        const cellSeed = fract(cellCoord.x).mul(12.9898).add(fract(cellCoord.y).mul(78.233)).add(fract(cellCoord.z).mul(45.164));
        const speckleRaw = fract(sin(cellSeed).mul(43758.5453));
        const speckleMask = smoothstep(this.#speckleThresholdU, this.#speckleThresholdU.add(0.05), speckleRaw);
        const inverseMask = float(1).sub(mask).clamp(0, 1);
        const speckle = speckleMask.mul(inverseMask).mul(this.#speckleIntensityU);
        return emissiveColorU.mul(emissiveIntensityU).mul(mask).mul(noiseVal).add(emissiveColorU.mul(speckle));
      })();
    }
  }
  // ─── Mesh ──────────────────────────────────────────────────────────────────
  #createMesh() {
    const bladeGeo = this.#bladeGeometry ?? this.#createBladeGeometry();
    this.mesh = new THREE.InstancedMesh(bladeGeo, this.material, this.#bladeCount);
    this.mesh.frustumCulled = false;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < this.#bladeCount; i++) this.mesh.setMatrixAt(i, dummy.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
    this.group.add(this.mesh);
  }
  // ─── Compute: init blade data + joint positions ───────────────────────────
  #createComputeInit() {
    const positioningNode = this.#positioningNode;
    const bladeData = this.bladeData;
    const bladeIsShown = this.bladeIsShown;
    const positions = this.positions;
    const prevPositions = this.prevPositions;
    const jointsPerBlade2 = this.#jointsPerBlade;
    const segmentLengthU = this.#segmentLengthU;
    const bladeHeightU = this.#bladeHeightU;
    const densityU = this.#densityU;
    const tiltAmplitudeU = this.#tiltAmplitudeU;
    this.#computeInit = Fn(() => {
      const bladeIdx = instanceIndex;
      const { wx, wz, isShown = float(1) } = positioningNode(bladeIdx);
      const densityMask = hash(bladeIdx.add(5381)).lessThan(densityU.min(1)).select(float(1), float(0));
      const finalShown = isShown.mul(densityMask).greaterThanEqual(0.5).select(float(1), float(0));
      bladeIsShown.element(bladeIdx).assign(finalShown);
      const n1 = mx_noise_float(vec3(wx.mul(0.35), float(0), wz.mul(0.35))).mul(0.5).add(0.5);
      const n2 = mx_noise_float(vec3(wx.mul(1.7).add(50), float(7), wz.mul(1.7).add(50))).mul(0.5).add(0.5);
      const clump = n1.mul(0.5).add(n2.mul(0.25)).max(0.6);
      bladeData.element(bladeIdx).assign(vec4(wx, wz, float(0), clump));
      const tiltAngle = hash(bladeIdx.add(7)).mul(PI).mul(2);
      const tiltMag = hash(bladeIdx.add(13)).mul(tiltAmplitudeU);
      const tiltX = cos(tiltAngle).mul(tiltMag);
      const tiltZ = sin(tiltAngle).mul(tiltMag);
      const restDir = normalize(vec3(tiltX, float(1), tiltZ));
      const heightScale = float(0.4).add(clump).mul(finalShown.sign());
      const segLen = segmentLengthU.mul(bladeHeightU).mul(heightScale);
      const root = vec3(wx, float(0), wz);
      for (let i = 0; i < jointsPerBlade2; i++) {
        const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
        const pos = root.add(restDir.mul(segLen.mul(float(i))));
        positions.element(jointIdx).assign(vec4(pos, float(0)));
        prevPositions.element(jointIdx).assign(vec4(pos, float(0)));
      }
    })().compute(this.#bladeCount);
  }
  // ─── Compute: per-frame simulation (one thread per blade) ─────────────────
  #createComputeUpdate() {
    const positioningNode = this.#positioningNode;
    const positions = this.positions;
    const prevPositions = this.prevPositions;
    const bladeData = this.bladeData;
    const bladeIsShown = this.bladeIsShown;
    const jointsPerBlade2 = this.#jointsPerBlade;
    const segmentsPerBlade = this.#segmentsPerBlade;
    const segmentLengthU = this.#segmentLengthU;
    const bladeHeightU = this.#bladeHeightU;
    const stiffnessU = this.#stiffnessU;
    const dampingU = this.#dampingU;
    const dragU = this.#dragU;
    const pushRadiusU = this.#pushRadiusU;
    const pushScaleU = this.#pushScaleU;
    const pushRecoveryU = this.#pushRecoveryU;
    const colliderGridStorage = this.#colliderGridStorage;
    const colliderDataStorage = this.#colliderDataStorage;
    const GRID_RES = _GrassNoodles.GRID_RES;
    const MAX_PER_CELL = _GrassNoodles.MAX_PER_CELL;
    const halfFieldF = this.#gridFieldSize / 2;
    const cellSizeF = this.#gridFieldSize / _GrassNoodles.GRID_RES;
    const buoyancyU = this.#buoyancyU;
    const gravityU = this.#gravityU;
    const tipMassU = this.#tipMassU;
    const flowAmplitudeU = this.#flowAmplitudeU;
    const flowFrequencyU = this.#flowFrequencyU;
    const flowSpeedU = this.#flowSpeedU;
    const flowPhaseOffsetU = this.#flowPhaseOffsetU;
    const flowVerticalAmplitudeU = this.#flowVerticalAmplitudeU;
    const waveAmplitudeU = this.#waveAmplitudeU;
    const waveSpeedU = this.#waveSpeedU;
    const wavePhasePerJointU = this.#wavePhasePerJointU;
    const selfRightU = this.#selfRightU;
    const tiltAmplitudeU = this.#tiltAmplitudeU;
    this.#computeUpdate = Fn(() => {
      const bladeIdx = instanceIndex;
      If(bladeIsShown.element(bladeIdx).greaterThan(0), () => {
        const { wx, wz } = positioningNode(bladeIdx);
        const blade = bladeData.element(bladeIdx);
        const heightScale = float(0.4).add(blade.w);
        const segLen = segmentLengthU.mul(bladeHeightU).mul(heightScale);
        const tiltAngle = hash(bladeIdx.add(7)).mul(PI).mul(2);
        const tiltMag = hash(bladeIdx.add(13)).mul(tiltAmplitudeU);
        const restTiltX = cos(tiltAngle).mul(tiltMag);
        const restTiltZ = sin(tiltAngle).mul(tiltMag);
        const restDir = normalize(vec3(restTiltX, float(1), restTiltZ));
        const rootIdx = bladeIdx.mul(jointsPerBlade2);
        const rootPos = vec3(wx, float(0), wz);
        positions.element(rootIdx).assign(vec4(rootPos, float(0)));
        prevPositions.element(rootIdx).assign(vec4(rootPos, float(0)));
        const cellX = wx.add(halfFieldF).div(cellSizeF).floor().toInt().max(0).min(GRID_RES - 1);
        const cellZ = wz.add(halfFieldF).div(cellSizeF).floor().toInt().max(0).min(GRID_RES - 1);
        const cellBase = cellZ.mul(GRID_RES).add(cellX).mul(MAX_PER_CELL);
        const dt = deltaTime;
        const oneMinusDamp = float(1).sub(dampingU);
        const flowPhaseX = hash(bladeIdx.add(23)).sub(0.5).mul(2).mul(flowPhaseOffsetU);
        const flowPhaseZ = hash(bladeIdx.add(41)).sub(0.5).mul(2).mul(flowPhaseOffsetU);
        const waveAngle = hash(bladeIdx.add(53)).mul(PI).mul(2);
        const waveDirX = cos(waveAngle);
        const waveDirZ = sin(waveAngle);
        const waveBladeOffset = hash(bladeIdx.add(67)).mul(PI).mul(2);
        for (let i = 1; i < jointsPerBlade2; i++) {
          const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const pos = positions.element(jointIdx).xyz;
          const prev = prevPositions.element(jointIdx).xyz;
          const velLin = pos.sub(prev).mul(oneMinusDamp);
          const speed = length(velLin);
          const vel = velLin.div(float(1).add(dragU.mul(speed)));
          const heightFactor = pow(float(i).div(segmentsPerBlade), float(1.4));
          const pushX = float(0).toVar();
          const pushZ = float(0).toVar();
          Loop(MAX_PER_CELL, ({ i: k }) => {
            const collIdx = colliderGridStorage.element(cellBase.add(k));
            const dataBase = collIdx.mul(3);
            const v0 = colliderDataStorage.element(dataBase);
            const v1 = colliderDataStorage.element(dataBase.add(1));
            const v2 = colliderDataStorage.element(dataBase.add(2));
            const cPos = v0.xyz;
            const cStrength = v1.w;
            const cType = v2.x;
            const isPush = float(1).sub(cType);
            const dx = pos.x.sub(cPos.x);
            const dz = pos.z.sub(cPos.z);
            const distH = sqrt(dx.mul(dx).add(dz.mul(dz))).add(1e-4);
            const falloff = float(1).sub(clamp(distH.div(pushRadiusU), float(0), float(1)));
            const influence = falloff.mul(falloff).mul(cStrength).mul(pushScaleU).mul(heightFactor).mul(dt).mul(isPush);
            pushX.addAssign(dx.div(distH).mul(influence));
            pushZ.addAssign(dz.div(distH).mul(influence));
          });
          const tipFactor = pow(float(i).div(segmentsPerBlade), tipMassU);
          const vyBias = buoyancyU.mul(heightFactor).sub(gravityU.mul(tipFactor)).mul(dt);
          const eps = float(0.5);
          const xs = pos.x.mul(flowFrequencyU).add(flowPhaseX);
          const zs = pos.z.mul(flowFrequencyU).add(flowPhaseZ);
          const ts = time.mul(flowSpeedU);
          const phiXpos = mx_noise_float(vec3(xs.add(eps), zs, ts));
          const phiXneg = mx_noise_float(vec3(xs.sub(eps), zs, ts));
          const phiZpos = mx_noise_float(vec3(xs, zs.add(eps), ts));
          const phiZneg = mx_noise_float(vec3(xs, zs.sub(eps), ts));
          const flowAmpStep = flowAmplitudeU.mul(heightFactor).mul(dt);
          const flowX = phiZpos.sub(phiZneg).mul(flowAmpStep);
          const flowZ = phiXneg.sub(phiXpos).mul(flowAmpStep);
          const phiY = mx_noise_float(vec3(xs.add(100), zs.add(100), ts.mul(0.7)));
          const flowY = phiY.mul(flowVerticalAmplitudeU).mul(heightFactor).mul(dt);
          const wavePhase = time.mul(waveSpeedU).mul(PI.mul(2)).sub(float(i).mul(wavePhasePerJointU)).add(waveBladeOffset);
          const waveStep = sin(wavePhase).mul(waveAmplitudeU).mul(heightFactor).mul(dt);
          const waveX = waveDirX.mul(waveStep);
          const waveZ = waveDirZ.mul(waveStep);
          const newPos = vec3(
            pos.x.add(vel.x).add(pushX).add(flowX).add(waveX),
            pos.y.add(vel.y).add(vyBias).add(flowY),
            pos.z.add(vel.z).add(pushZ).add(flowZ).add(waveZ)
          );
          prevPositions.element(jointIdx).assign(vec4(pos, float(0)));
          positions.element(jointIdx).assign(vec4(newPos, float(0)));
        }
        for (let i = 1; i < jointsPerBlade2; i++) {
          const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const prevIdx = bladeIdx.mul(jointsPerBlade2).add(i - 1);
          const pos = positions.element(jointIdx).xyz;
          const posPrev = positions.element(prevIdx).xyz;
          const diff = pos.sub(posPrev);
          const d = length(diff).add(1e-6);
          const dir = diff.div(d);
          const target = posPrev.add(dir.mul(segLen));
          positions.element(jointIdx).assign(vec4(target, float(0)));
        }
        const bendStep = clamp(stiffnessU.mul(dt).mul(8), float(0), float(1));
        let prevDir = restDir;
        for (let i = 0; i < segmentsPerBlade; i++) {
          const aIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const bIdx = aIdx.add(1);
          const a = positions.element(aIdx).xyz;
          const b = positions.element(bIdx).xyz;
          const diff = b.sub(a);
          const d = length(diff).add(1e-6);
          const actualDir = diff.div(d);
          const targetDir = normalize(mix(actualDir, prevDir, bendStep));
          positions.element(bIdx).assign(vec4(a.add(targetDir.mul(segLen)), float(0)));
          prevDir = actualDir;
        }
        const basePos = vec3(wx, float(0), wz);
        const distGate = float(1).toVar();
        Loop(MAX_PER_CELL, ({ i: k }) => {
          const collIdx = colliderGridStorage.element(cellBase.add(k));
          const cPos = colliderDataStorage.element(collIdx.mul(3)).xyz;
          const d = clamp(length(basePos.sub(cPos)).div(pushRadiusU), float(0), float(1));
          distGate.assign(min(distGate, d));
        });
        const relaxBendStep = clamp(distGate.mul(pushRecoveryU).mul(dt).mul(2.4), float(0), float(1));
        let relaxPrevDir = restDir;
        for (let i = 0; i < segmentsPerBlade; i++) {
          const aIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const bIdx = aIdx.add(1);
          const a = positions.element(aIdx).xyz;
          const b = positions.element(bIdx).xyz;
          const diff = b.sub(a);
          const d = length(diff).add(1e-6);
          const actualDir = diff.div(d);
          const targetDir = normalize(mix(actualDir, relaxPrevDir, relaxBendStep));
          positions.element(bIdx).assign(vec4(a.add(targetDir.mul(segLen)), float(0)));
          relaxPrevDir = actualDir;
        }
        let comSum = vec3(0, 0, 0);
        for (let i = 1; i < jointsPerBlade2; i++) {
          const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          comSum = comSum.add(positions.element(jointIdx).xyz);
        }
        const comAvg = comSum.div(float(jointsPerBlade2 - 1));
        const chainDir = normalize(comAvg.sub(rootPos));
        const selfRightStep = clamp(selfRightU.mul(dt).mul(4), float(0), float(1));
        const targetChainDir = normalize(mix(chainDir, restDir, selfRightStep));
        const cosTheta = chainDir.dot(targetChainDir);
        const rotN = cross(chainDir, targetChainDir);
        const oneOverOnePlusCos = float(1).div(cosTheta.add(1).max(1e-4));
        for (let i = 1; i < jointsPerBlade2; i++) {
          const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const local = positions.element(jointIdx).xyz.sub(rootPos);
          const rotated = local.mul(cosTheta).add(cross(rotN, local)).add(rotN.mul(rotN.dot(local)).mul(oneOverOnePlusCos));
          positions.element(jointIdx).assign(vec4(rotated.add(rootPos), float(0)));
        }
        for (let i = 1; i < jointsPerBlade2; i++) {
          const jointIdx = bladeIdx.mul(jointsPerBlade2).add(i);
          const p = positions.element(jointIdx).xyz.toVar();
          Loop(MAX_PER_CELL, ({ i: k }) => {
            const collIdx = colliderGridStorage.element(cellBase.add(k));
            const dataBase = collIdx.mul(3);
            const v0 = colliderDataStorage.element(dataBase);
            const v1 = colliderDataStorage.element(dataBase.add(1));
            const v2 = colliderDataStorage.element(dataBase.add(2));
            const capA = v0.xyz;
            const radius = v0.w;
            const capB = v1.xyz;
            const isCollision = v2.x;
            const ab = capB.sub(capA);
            const ap = p.sub(capA);
            const abLen2 = ab.dot(ab).add(1e-6);
            const tParam = clamp(ap.dot(ab).div(abLen2), float(0), float(1));
            const closest = capA.add(ab.mul(tParam));
            const toP = p.sub(closest);
            const dist = length(toP).add(1e-6);
            const outDir = toP.div(dist);
            const overlap = max(float(0), radius.sub(dist)).mul(isCollision);
            p.assign(p.add(outDir.mul(overlap)));
          });
          positions.element(jointIdx).assign(vec4(p, float(0)));
        }
      });
    })().compute(this.#bladeCount);
  }
};
