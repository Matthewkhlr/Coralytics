import * as THREE2 from "three/webgpu";
import {
  Fn as Fn2,
  uniform as uniform2,
  vec3 as vec32,
  vec4 as vec42,
  float as float2,
  uv as uv2,
  time as time2,
  abs,
  pow as pow2,
  mx_noise_float as mx_noise_float2,
  smoothstep as smoothstep2
} from "three/tsl";
export var ProceduralCaustics = class {
  #renderer;
  #renderTarget;
  #scene;
  #camera;
  #quad;
  constructor(renderer2, {
    resolution = 512,
    color = "#ffffff",
    strength = 1,
    frequency = 4,
    speed = 0.5,
    baseBrightness = 0.5
  } = {}) {
    this.#renderer = renderer2;
    const colorU = uniform2(new THREE2.Color(color));
    const strengthU = uniform2(strength);
    const frequencyU = uniform2(frequency);
    const speedU = uniform2(speed);
    const baseU = uniform2(baseBrightness);
    this.uniforms = {
      color: colorU,
      strength: strengthU,
      frequency: frequencyU,
      speed: speedU,
      baseBrightness: baseU
    };
    this.#renderTarget = new THREE2.RenderTarget(resolution, resolution, {
      type: THREE2.HalfFloatType,
      depthBuffer: false,
      stencilBuffer: false,
      generateMipmaps: false,
      colorSpace: THREE2.SRGBColorSpace
    });
    this.#renderTarget.texture.wrapS = THREE2.ClampToEdgeWrapping;
    this.#renderTarget.texture.wrapT = THREE2.ClampToEdgeWrapping;
    this.#renderTarget.texture.minFilter = THREE2.LinearFilter;
    this.#renderTarget.texture.magFilter = THREE2.LinearFilter;
    this.#renderTarget.texture.anisotropy = 8;
    const causticMat = new THREE2.MeshBasicNodeMaterial();
    causticMat.colorNode = Fn2(() => {
      const t = time2.mul(speedU);
      const p = uv2().sub(0.5).mul(frequencyU);
      const n1 = mx_noise_float2(vec32(p.x.mul(2).add(t), p.y.mul(2), t.mul(0.5)));
      const n2 = mx_noise_float2(
        vec32(p.x.mul(2.5).sub(t.mul(0.3)), p.y.mul(2.5).add(t.mul(0.5)), t.mul(0.4))
      );
      const c = abs(n1).add(abs(n2)).mul(0.5);
      const peaks = pow2(float2(1).sub(c).max(0), 8).mul(strengthU);
      const dist = uv2().sub(0.5).length().mul(2);
      const vignette = float2(1).sub(smoothstep2(0.7, 1, dist));
      const intensity = baseU.add(peaks).mul(vignette);
      return vec42(colorU.mul(intensity), 1);
    })();
    const geo = new THREE2.PlaneGeometry(2, 2);
    this.#quad = new THREE2.Mesh(geo, causticMat);
    this.#quad.frustumCulled = false;
    this.#scene = new THREE2.Scene();
    this.#scene.add(this.#quad);
    this.#camera = new THREE2.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  }
  get texture() {
    return this.#renderTarget.texture;
  }
  update() {
    const prevTarget = this.#renderer.getRenderTarget();
    this.#renderer.setRenderTarget(this.#renderTarget);
    this.#renderer.render(this.#scene, this.#camera);
    this.#renderer.setRenderTarget(prevTarget);
  }
  dispose() {
    this.#renderTarget.dispose();
    this.#quad.geometry.dispose();
    this.#quad.material.dispose();
  }
};
