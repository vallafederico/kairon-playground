import Tween from "gsap";
import { Renderer, Orbit } from "ogl";
import Cam from "./_camera.js";
import Scene from "./_scene.js";
import { Post } from "./post/post.js";

export default class {
  constructor() {
    this.wrapper = document.getElementById("c");
    this.vp = {
      dpr: Math.min(window.devicePixelRatio, 2),
    };

    this.renderer = new Renderer({ dpr: 2 });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 1);

    this.wrapper.appendChild(this.gl.canvas);

    this.camera = new Cam(this.gl, {});
    this.camera.position.set(0, 0, 5);

    // this.camera.lookAt([0, 0, 0]);
    // this.controls = new Orbit(this.camera);

    this.timeActive = false;
    this.mouse = { x: 0, y: 0, ex: 0, ey: 0 };

    this.scene = new Scene(this.gl);
    this.post = new Post(this.gl);
    this.time = 0;

    this.resize();
    this.initEvents();

    this.render();

    setTimeout(() => {
      this.timeActive = true;
    }, 3000);
  }

  render(scroll = 0) {
    if (this.timeActive) this.time += 0.005;

    if (this.controls) this.controls.update();
    if (this.scene) {
      this.scene.rotation.y = this.mouse.ex;
      this.scene.rotation.x = this.mouse.ey;
      this.scene.render(this.time);
    }

    window.requestAnimationFrame(this.render.bind(this));

    if (this.post?.isActive) {
      this.renderPost(this.time);
    } else
      this.renderer.render({
        scene: this.scene,
        camera: this.camera,
      });
  }

  renderPost(t) {
    // 1. render scene to rt
    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
      target: this.post.rt,
    });

    // 2. move time in post
    this.post.render(t);

    // 3. render post to quad
    this.renderer.render({
      scene: this.post.quad,
      camera: this.camera,
    });
  }

  initEvents() {
    // resize
    new ResizeObserver((entry) => this.resize(entry[0].contentRect)).observe(
      this.wrapper
    );
    // mouse
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = (e.clientX / this.vp.w) * 2 - 1;
      this.mouse.y = (e.clientY / this.vp.h) * 2 - 1;
      Tween.to(this.mouse, {
        ex: this.mouse.x,
        ey: this.mouse.y,
        duration: 1.5,
        ease: "slow",
      });
    });
  }

  resize(entry) {
    const cw = entry ? entry.width : this.wrapper.clientWidth;
    const ch = entry ? entry.height : this.wrapper.clientHeight;

    this.vp.w = cw;
    this.vp.h = ch;
    this.vp.ratio = cw / ch;
    this.vp.viewSize = this.camera.getViewSize(this.vp.ratio);
    this.vp.viewRatio = this.vp.viewSize.w / this.vp.w;
    // this.vp.scrollx = window.scrollX;
    // this.vp.scrolly = window.scrollY;

    this.renderer.setSize(this.vp.w, this.vp.h);
    this.camera.perspective({
      aspect: this.vp.ratio,
    });

    this.scene.resize(this.vp);
    this.post?.resize(this.vp);
    // this.resizeChild();
  }
}
