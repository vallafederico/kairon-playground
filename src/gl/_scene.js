import { Transform } from "ogl";

// import Quad from "./_quad.js";
import { Loader } from "./util/loader.js";
import { Model } from "./_model.js";
import { Spinner } from "../modules/spinner.js";

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

    this.spinner = new Spinner();

    this.create();
    // console.log("loaded:", data);

    // console.log(this);
  }

  create() {
    this.model = new Model(this.gl, {
      geometry: window.store.model_all,
    });

    this.model.setParent(this);
  }

  render(t) {
    if (!this.isOn) return;

    this.spinner?.render(t);
    if (this.model) this.model.render(t, this.spinner);
    // if (this.quads) this.quads.forEach((item) => item.render(t));
  }

  resize(vp) {
    this.vp = vp;
    if (this.model) this.model.resize(vp);
  }
}
