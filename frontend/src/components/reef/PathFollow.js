import * as THREE3 from "three/webgpu";
import {
  Fn as Fn3,
  uniform as uniform3,
  vec2,
  vec3 as vec33,
  float as float3,
  select as select2,
  texture as texture2,
  positionLocal,
  normalLocal,
  cross as cross2
} from "three/tsl";
export var PathFollow = class {
  #samples;
  #curve;
  #dataTexture;
  constructor({ points, samples = 256, closed = false, flow = true } = {}) {
    this.#samples = samples;
    this.#curve = new THREE3.CatmullRomCurve3(points, closed);
    this.#dataTexture = this.#buildDataTexture();
    this.pathOffset = uniform3(0);
    this.pathSegment = uniform3(1);
    this.spineOffset = uniform3(0);
    this.spineLength = uniform3(1);
    this.flow = uniform3(flow ? 1 : 0);
  }
  get curve() {
    return this.#curve;
  }
  get dataTexture() {
    return this.#dataTexture;
  }
  #buildDataTexture() {
    const N = this.#samples;
    const data = new Uint16Array(N * 2 * 4);
    const tex = new THREE3.DataTexture(data, N, 2, THREE3.RGBAFormat, THREE3.HalfFloatType);
    tex.wrapS = THREE3.RepeatWrapping;
    tex.wrapT = THREE3.ClampToEdgeWrapping;
    tex.minFilter = THREE3.LinearFilter;
    tex.magFilter = THREE3.LinearFilter;
    tex.generateMipmaps = false;
    this.#fillDataTexture(tex);
    return tex;
  }
  #fillDataTexture(tex) {
    const N = this.#samples;
    const data = tex.image.data;
    const frames = this.#curve.computeFrenetFrames(N - 1, this.#curve.closed);
    const basis = new THREE3.Matrix4();
    const quats = [];
    for (let i = 0; i < N; i++) {
      basis.makeBasis(frames.tangents[i], frames.normals[i], frames.binormals[i]);
      const q = new THREE3.Quaternion().setFromRotationMatrix(basis);
      if (i > 0 && q.dot(quats[i - 1]) < 0) {
        q.set(-q.x, -q.y, -q.z, -q.w);
      }
      quats.push(q);
    }
    const toHalf = THREE3.DataUtils.toHalfFloat;
    const writeRow = (row, i, x, y, z, w) => {
      const idx = (row * N + i) * 4;
      data[idx + 0] = toHalf(x);
      data[idx + 1] = toHalf(y);
      data[idx + 2] = toHalf(z);
      data[idx + 3] = toHalf(w);
    };
    for (let i = 0; i < N; i++) {
      const t = i / (N - 1);
      const pos = this.#curve.getPointAt(t);
      const q = quats[i];
      writeRow(0, i, pos.x, pos.y, pos.z, 0);
      writeRow(1, i, q.x, q.y, q.z, q.w);
    }
    tex.needsUpdate = true;
  }
  // Replace the spline with a new set of control points. The curve type
  // (closed) is preserved. pathSegment is re-derived from the new curve
  // length so the mesh keeps its natural span (matches setBoundsFromObject's
  // default behavior).
  setPoints(points) {
    const closed = this.#curve.closed;
    this.#curve = new THREE3.CatmullRomCurve3(points, closed);
    this.#fillDataTexture(this.#dataTexture);
    this.pathSegment.value = this.spineLength.value / Math.max(1e-6, this.#curve.getLength());
  }
  // Sets spineOffset/spineLength from a local-space bbox and updates
  // pathSegment to the ratio that preserves the mesh's original length along
  // the curve (spineLength / curveArcLength). Pass `autoSegment: false` to
  // keep the current pathSegment.
  setBoundsFromGeometryBox(box, { autoSegment = true } = {}) {
    this.spineOffset.value = -box.min.x;
    this.spineLength.value = Math.max(1e-6, box.max.x - box.min.x);
    if (autoSegment) {
      this.pathSegment.value = this.spineLength.value / Math.max(1e-6, this.#curve.getLength());
    }
  }
  setBoundsFromObject(object, options) {
    const box = new THREE3.Box3();
    object.traverse((child) => {
      if (child.isMesh && child.geometry) {
        if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
        box.union(child.geometry.boundingBox);
      }
    });
    this.setBoundsFromGeometryBox(box, options);
  }
  applyTo(target) {
    let material = target;
    if (target.isMesh) {
      target.frustumCulled = false;
      material = target.material;
    }
    const tex = this.#dataTexture;
    const pathOffsetU = this.pathOffset;
    const pathSegmentU = this.pathSegment;
    const spineOffsetU = this.spineOffset;
    const spineLengthU = this.spineLength;
    const flowU = this.flow;
    const rowCount = float3(2);
    const rowUV = (mt, row) => vec2(mt, row.add(0.5).div(rowCount));
    const rotateByQuat = (q, v) => {
      const c = cross2(q.xyz, v).add(v.mul(q.w));
      return v.add(cross2(q.xyz, c).mul(2));
    };
    material.positionNode = Fn3(() => {
      const localPos = positionLocal;
      const bend = flowU.greaterThan(0);
      const spinePortion = select2(
        bend,
        localPos.x.add(spineOffsetU).div(spineLengthU),
        float3(0)
      );
      const xWeight = select2(bend, float3(0), float3(1));
      const mt = spinePortion.mul(pathSegmentU).add(pathOffsetU);
      const spinePos = texture2(tex, rowUV(mt, float3(0))).xyz;
      const q = texture2(tex, rowUV(mt, float3(1))).normalize();
      const local = vec33(localPos.x.mul(xWeight), localPos.y, localPos.z);
      return rotateByQuat(q, local).add(spinePos);
    })();
    material.normalNode = Fn3(() => {
      const localPos = positionLocal;
      const bend = flowU.greaterThan(0);
      const spinePortion = select2(
        bend,
        localPos.x.add(spineOffsetU).div(spineLengthU),
        float3(0)
      );
      const mt = spinePortion.mul(pathSegmentU).add(pathOffsetU);
      const q = texture2(tex, rowUV(mt, float3(1))).normalize();
      return rotateByQuat(q, normalLocal).normalize();
    })();
  }
  buildHelper({ color = 65416, divisions = 200 } = {}) {
    const geo = new THREE3.BufferGeometry();
    const mat = new THREE3.LineBasicMaterial({ color, fog: false });
    const line = new THREE3.Line(geo, mat);
    line.userData.divisions = divisions;
    this.refreshHelper(line);
    return line;
  }
  // Rewrites a helper line's geometry from the current curve. Call this
  // after setPoints() to keep a previously-built helper visualization in
  // sync with the spline.
  refreshHelper(line) {
    const divisions = line.userData.divisions ?? 200;
    line.geometry.setFromPoints(this.#curve.getSpacedPoints(divisions));
  }
};

