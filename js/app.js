import {
  renderApp
} from "./ui/render.js";

import {
  loadState
} from "../db/database.js";

import {
  getState
} from "./state/state.js";

// =========================
// INIT
// =========================
window.addEventListener(
  "DOMContentLoaded",
  async () => {

    try {

      await bootstrapApp();
    }
    catch (err) {

      console.error(
        "APP INIT ERROR",
        err
      );

      forceStartApp();
    }
  }
);

// =========================
// BOOTSTRAP
// =========================
async function bootstrapApp() {

  showSplash();

  // splash 최소 유지 시간
  await delay(1200);

  // 저장 데이터 로드
  try {

    const savedState =
      await loadState();

    if (savedState) {

      hydrateState(
        savedState
      );
    }
  }
  catch (err) {

    console.error(
      "LOAD STATE ERROR",
      err
    );
  }

  // 렌더
  renderSafe();

  // splash 제거
  hideSplash();
}

// =========================
// SAFE RENDER
// =========================
function renderSafe() {

  try {

    renderApp();
  }
  catch (err) {

    console.error(
      "RENDER ERROR",
      err
    );

    // fallback UI
    const app =
      document.getElementById(
        "app"
      );

    if (app) {

      app.innerHTML = `

        <div style="
          padding:40px;
          color:white;
          text-align:center;
          font-size:18px;
        ">

          앱 렌더 중 오류 발생

        </div>
      `;
    }
  }
}

// =========================
// HYDRATE
// =========================
function hydrateState(saved) {

  const state =
    getState();

  // DATA
  if (saved.data) {

    state.data =
      saved.data;
  }

  // SELECTION
  if (saved.selection) {

    state.selection =
      saved.selection;
  }

  // HISTORY
  if (saved.history) {

    state.history =
      saved.history;
  }
}

// =========================
// SHOW SPLASH
// =========================
function showSplash() {

  const splash =
    document.getElementById(
      "splash"
    );

  if (!splash) return;

  splash.style.opacity =
    "1";

  splash.style.visibility =
    "visible";
}

// =========================
// HIDE SPLASH
// =========================
function hideSplash() {

  const splash =
    document.getElementById(
      "splash"
    );

  const app =
    document.getElementById(
      "app"
    );

  // app fade in
  if (app) {

    app.style.opacity =
      "1";
  }

  // splash hide
  if (splash) {

    splash.classList.add(
      "hide"
    );

    setTimeout(() => {

      splash.remove();

    }, 800);
  }
}

// =========================
// FORCE START
// =========================
function forceStartApp() {

  renderSafe();

  hideSplash();
}

// =========================
// DELAY
// =========================
function delay(ms) {

  return new Promise(resolve => {

    setTimeout(
      resolve,
      ms
    );
  });
}
