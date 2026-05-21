import {
  initController
} from "./core/controller.js";

// =========================
// APP START
// =========================
async function startApp(){

  try{

    console.log(
      "APP START"
    );

    const controller =
      initController();

    await controller.boot();

    console.log(
      "APP READY"
    );
  }
  catch(error){

    console.error(
      "APP BOOT ERROR",
      error
    );

    document.body.innerHTML = `
      <div
        style="
          padding:40px;
          color:white;
          background:#111827;
          font-family:sans-serif;
        "
      >
        앱 실행 중 오류 발생
      </div>
    `;
  }
}

// =========================
// DOM READY
// =========================
window.addEventListener(
  "DOMContentLoaded",
  ()=>{
    startApp();
  }
);
