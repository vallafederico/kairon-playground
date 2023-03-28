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

  initControllers() {
    this.val = {
      anim: {
        timeline: 0,
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
