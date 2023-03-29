import { Program } from "ogl";
import vertex from "./vertex.vert";
import fragment from "./fragment.frag";

export default class extends Program {
  constructor(gl, options = {}) {
    super(gl, {
      vertex: vertex,
      fragment: fragment,
    });

    // console.log(this.uniforms);
    this.transparent = null;
    this.cullFace = null;

    this.uniforms = {
      u_time: { value: 0 },
      u_texture: { value: null },
      u_resolution: { value: [0, 0] },
      // gui
      u_tile_size_x: { value: 0 },
      u_light_limit: { value: 0 },
      u_line_thin: { value: 0 },
      u_line_large: { value: 0 },
    };
  }

  set time(t) {
    this.renderGui();
    this.uniforms.u_time.value = t;
  }

  renderGui() {
    const { tile_size_x, light_limit, line_thin, line_large } =
      window.gui.val.anim;

    this.uniforms.u_tile_size_x.value = tile_size_x * 50;
    this.uniforms.u_light_limit.value = light_limit;
    this.uniforms.u_line_thin.value = line_thin;
    this.uniforms.u_line_large.value = line_large;
  }

  set texture(texture) {
    this.uniforms.u_texture.value = texture;
    // console.log(texture);
  }
}
