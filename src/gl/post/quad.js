import { Triangle, Mesh } from "ogl";
import Material from "./mat/index.js";

export default class extends Mesh {
  constructor(gl) {
    super(gl);
    this.gl = gl;
    this.geometry = new Triangle(this.gl);
    this.program = new Material(this.gl);
  }

  resize(vp) {
    this.vp = vp;
    this.program.uniforms.u_resolution.value = [vp.w, vp.h];
  }

  render(t) {
    this.program.time = t;
  }
}
