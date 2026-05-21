import {
  initController
} from "./core/controller.js";

window.addEventListener(
  "DOMContentLoaded",
  async ()=>{

    const controller =
      initController();

    await controller.boot();
  }
);
