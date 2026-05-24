import {
  renderLayout
} from "./renderLayout.js";

import {
  renderRoulette
} from "./renderRoulette.js";

import {
  renderLists
} from "./renderCoverflow.js";

// =========================
// FULL
// =========================
export function renderApp() {

  try {

    renderLayout();
  }
  catch (err) {

    console.error(
      "LAYOUT ERROR",
      err
    );
  }

  try {

    renderRoulette();
  }
  catch (err) {

    console.error(
      "ROULETTE ERROR",
      err
    );
  }

  try {

    renderLists();
  }
  catch (err) {

    console.error(
      "LIST ERROR",
      err
    );
  }
}

// =========================
// ROULETTE ONLY
// =========================
export function renderRouletteOnly() {

  requestAnimationFrame(() => {

    renderRoulette();
  });
}

// =========================
// LIST ONLY
// =========================
export function renderListsOnly() {

  requestAnimationFrame(() => {

    renderLists();
  });
}
