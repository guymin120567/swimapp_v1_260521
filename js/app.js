import {
  initController
} from "./core/controller.js";

// =========================
// APP
// =========================
window.addEventListener(
  "DOMContentLoaded",
  async ()=>{

    try{

      showSplash();

      const controller =
        initController();

      await controller.boot();

      hideSplash();
    }
    catch(err){

      console.error(
        "APP INIT ERROR",
        err
      );

      forceStart();
    }
  }
);

// =========================
// SPLASH
// =========================
function showSplash(){

  const splash =
    document.getElementById(
      "splash"
    );

  if(!splash) return;

  splash.style.opacity =
    "1";

  splash.style.visibility =
    "visible";
}

// =========================
// HIDE
// =========================
function hideSplash(){

  const splash =
    document.getElementById(
      "splash"
    );

  const app =
    document.getElementById(
      "app"
    );

  if(app){

    app.style.opacity =
      "1";
  }

  if(splash){

    splash.classList.add(
      "hide"
    );

    setTimeout(()=>{

      splash.remove();

    },800);
  }
}

// =========================
// FORCE START
// =========================
function forceStart(){

  const splash =
    document.getElementById(
      "splash"
    );

  if(splash){

    splash.remove();
  }

  const app =
    document.getElementById(
      "app"
    );

  if(app){

    app.innerHTML =
      `
      <div style="
        padding:40px;
        text-align:center;
      ">
        앱 시작 오류
      </div>
      `;
  }
}
