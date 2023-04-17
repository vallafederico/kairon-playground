import { Plane, Mesh } from "ogl";
import Material from "./mat/_model";

export class Model extends Mesh {
  constructor(
    gl,
    { geometry } = {
      geometry: new Plane(gl),
    }
  ) {
    super(gl);
    this.gl = gl;

    this.geometry = geometry;
    this.program = new Material(this.gl);

    const scale = 0.5;
    this.scale.set(scale, scale, scale);
    this.rotation.y = -Math.PI / 2;
    // this.rotation.x = -Math.PI / 3;
  }

  resize() {}

  render(t, { spin }) {
    // console.log(spin);
    this.program.time = t;
    // this.position.x = Math.sin(t) * 0.2;

    this.rotation.y = -Math.PI / 2 + spin.x * 0.2;
    // this.rotation.x = t * 0.6;
    // this.rotation.z = t * 0.2;
  }
}
