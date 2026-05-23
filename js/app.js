// app.js

import { initController } from "./core/controller.js";

document.addEventListener("DOMContentLoaded", async () => {

  console.log("DOM LOADED");

  const app = initController();

  await app.boot();

  console.log("APP READY");
});
