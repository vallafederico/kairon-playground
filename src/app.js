import "./style/main.css";
import Dom from "@m/dom";
import Viewport from "@m/viewport";
import Gl from "./gl/gl";
import { Gui } from "./modules/gui";

// import { ASSETS } from "@a/";

class App {
  constructor() {
    this.body = document.querySelector("body");
    this.viewport = new Viewport();

    this.time = 0;

    this.init();
  }

  init() {
    this.dom = new Dom();

    this.gl = new Gl();

    this.initEvents();
    // this.render()
  }

  initEvents() {
    // prettier-ignore
    new ResizeObserver((entry) => this.resize(entry[0])).observe(this.body);

    // mouse
    this.mouse = { x: 0, y: 0, ex: 0, ey: 0 };
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  resize({ contentRect }) {
    this.viewport?.resize();
    this.dom?.resize();
  }

  render() {
    this.time += 0.1;

    window.requestAnimationFrame(this.render.bind(this));
  }

  /* Events */
}

window.app = new App();
