import { ASSETS } from "../../assets/";
import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";

export class Loader {
  constructor(gl) {
    this.gl = gl;
  }

  async load() {
    console.time("load -");
    // console.log(window.store);
    const toLoad = [];
    for (const [key, value] of Object.entries(ASSETS)) {
      // console.log(key, value);
      toLoad.push(loadSomething(this.gl, value));
    }

    const [model_logo] = await Promise.all(toLoad);

    window.store = {
      model_logo: model_logo.meshes[0].primitives[0].geometry,
    };
    console.timeEnd("load -");
  }
}

function loadSomething(gl, item) {
  const filetype = item.split(".").pop();
  // console.log(filetype);

  switch (filetype) {
    case "glb" || "gltf":
      return loadModel(gl, item);
      break;
    case "jpg" || "png" || "jpeg" || "webp":
      return loadTexture(gl, item);
      break;
  }
}
