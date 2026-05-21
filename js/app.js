import {
  initController
} from "./core/controller.js";

// =========================
// START APP
// =========================
window.addEventListener(
  "DOMContentLoaded",
  async ()=>{

    console.log(
      "DOM LOADED"
    );

    try{

      const controller =
        initController();

      await controller.boot();

      console.log(
        "APP READY"
      );
    }
    catch(error){

      console.error(
        "APP START ERROR",
        error
      );

      document.body.innerHTML = `
        <div
          style="
            padding:40px;
            background:#111827;
            color:white;
            font-family:sans-serif;
          "
        >
          앱 실행 오류
        </div>
      `;
    }
  }
);
