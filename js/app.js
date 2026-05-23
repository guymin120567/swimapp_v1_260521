import {
  initController
} from "./js/core/controller.js";

// =========================
// CONTROLLER
// =========================
const controller =
  initController();

// =========================
// BOOT
// =========================
async function start(){

  await controller.boot();

  // =========================
  // SPLASH
  // =========================
  const splash =
    document.getElementById(
      "splash"
    );

  requestAnimationFrame(()=>{

    document
      .getElementById("app")
      .style.opacity = 1;

    splash.classList.add(
      "hide"
    );
  });

  setTimeout(()=>{

    splash.remove();

  },900);
}

start();
