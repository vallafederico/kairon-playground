import { Transform } from "ogl";

// import Quad from "./_quad.js";
import { Loader } from "./util/loader.js";
import { Model } from "./_model.js";

export default class extends Transform {
  constructor(gl, data = {}) {
    super();
    this.gl = gl;
    this.isOn = true;

    this.load();
  }

  async load() {
    this.loader = new Loader(this.gl);
    await this.loader.load();

    this.create();
    // console.log("loaded:", data);

    // console.log(this);
  }

  create() {
    this.model = new Model(this.gl, {
      geometry: window.store.model_logo,
    });

    this.model.setParent(this);
  }

  render(t) {
    if (!this.isOn) return;
    if (this.model) this.model.render(t);
    // if (this.quads) this.quads.forEach((item) => item.render(t));
  }

  resize(vp) {
    this.vp = vp;
    if (this.model) this.model.resize(vp);
  }
}
