import LilGui from "lil-gui";

export class Gui extends LilGui {
  constructor() {
    super();
    this.initControllers();
    this.initWindowGui();
    this.initConstants();
    window.gui = this;

    this.close();
  }
  /*
const vec2 TILE_SIZE = vec2(25.0, 1.);
const float LIGHT_LIMIT = 0.5;
const float LINE_THIN = 0.05;
const float LINE_LARGE = .4;

  */

  initControllers() {
    this.val = {
      anim: {
        tile_size_x: 0.37,
        // tile_size_y: ,
        light_limit: 0.238,
        line_thin: 0.05,
        line_large: 0.259,
        // speed: [0, 1, 10],
      },
    };
  }

  initWindowGui() {
    for (const key in this.val) {
      const fold = this.addFolder(key);
      // fold.close();

      for (const key2 in this.val[key]) {
        fold.add(this.val[key], key2, 0, 1, 0.001);
      }
    }
  }

  initConstants() {
    // prettier-ignore
    this.const = {
      lightGreen: [0.08627450980392157, 0.23137254901960785, 0.2],
      darkGreen: [0.047058823529411764, 0.13725490196078433, 0.11764705882352941],
    };
  }
}

new Gui();
