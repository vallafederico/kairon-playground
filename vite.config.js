import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import glsl from "vite-plugin-glsl";

// folder struct
const folders = {};

// config
const config = {};

// plugins
const plugins = [glsl()];

// assets
const assetsInclude = ["**/*.gltf", "**/*.glb"];

export default defineConfig({
  assetsInclude,
  plugins,
  resolve: {
    alias: {
      "@m": fileURLToPath(new URL("./src/modules", import.meta.url)),
      "@u": fileURLToPath(new URL("./src/util", import.meta.url)),
      "@a": fileURLToPath(new URL("./src/assets", import.meta.url)),
    },
  },
});
