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

  
  const startedAt =
    performance.now();

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
    // 최소 splash 유지시간
    // =========================
    const MIN_SPLASH = 1600;

    const elapsed =
      performance.now() - startedAt;

    const remain =
      Math.max(
        0,
        MIN_SPLASH - elapsed
      );

    setTimeout(()=>{

      const splash =
        document.getElementById(
          "splash"
        );

      const app =
        document.getElementById(
          "app"
        );

      requestAnimationFrame(()=>{

        if(app){

          app.style.opacity = 1;
        }

        if(splash){

          splash.classList.add(
            "hide"
          );
        }
      });

      setTimeout(()=>{

        splash?.remove();

      },900);

    },remain);
  }
}

start();
