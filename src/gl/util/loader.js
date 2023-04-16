import { ASSETS } from "../../assets/";
import { loadTexture } from "./texture-loader";
import { loadModel } from "./model-loader";

export class Loader {
  constructor(gl) {
    this.gl = gl;
    this.hash = roughScale(window.location.hash.substring(1), 10);
    console.log(this.hash);
  }

  async load() {
    console.time("load -");
    // console.log(window.store);
    const toLoad = [];
    for (const [key, value] of Object.entries(ASSETS)) {
      // console.log(key, value);
      toLoad.push(loadSomething(this.gl, value));
    }

    const [model_logo, model_all] = await Promise.all(toLoad);
    console.log(model_all, model_all.meshes);

    window.store = {
      model_all: model_all.meshes[this.hash].primitives[0].geometry,
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

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}
