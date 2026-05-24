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

  await delay(1200);

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

  renderApp();

  hideSplash();
}

// =========================
// HYDRATE
// =========================
function hydrateState(saved) {

  const state =
    getState();

  if (saved.data) {

    state.data =
      saved.data;
  }

  if (saved.selection) {

    state.selection =
      saved.selection;
  }
}

// =========================
// SPLASH
// =========================
function showSplash() {

  const splash =
    document.getElementById(
      "splash"
    );

  if (!splash) return;

  splash.style.opacity =
    "1";

  splash.style.pointerEvents =
    "all";
}

// =========================
// HIDE SPLASH
// =========================
function hideSplash() {

  const splash =
    document.getElementById(
      "splash"
    );

  if (!splash) return;

  splash.style.opacity =
    "0";

  splash.style.pointerEvents =
    "none";

  setTimeout(() => {

    splash.remove();

  }, 500);
}

// =========================
// FORCE START
// =========================
function forceStartApp() {

  renderApp();

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
