import {
  initController
} from "./core/controller.js";

// =========================
// CONTROLLER
// =========================
const controller =
  initController();

// =========================
// START
// =========================
async function start(){

  try{

    // =========================
    // BOOT
    // =========================
    await controller.boot();

    console.log(
      "BOOT SUCCESS"
    );
  }
  catch(error){

    console.error(
      "APP ERROR",
      error
    );
  }
  finally{

    // =========================
    // SPLASH REMOVE
    // =========================
    const splash =
      document.getElementById(
        "splash"
      );

    const app =
      document.getElementById(
        "app"
      );

    requestAnimationFrame(()=>{

      app.style.opacity = 1;

      splash.classList.add(
        "hide"
      );
    });

    setTimeout(()=>{

      splash.remove();

    },900);
  }
}

start();
