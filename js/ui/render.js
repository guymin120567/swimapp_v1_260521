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
export function renderApp(){

  renderLayout();

  renderRoulette();

  renderLists();
}

// =========================
// ROULETTE
// =========================
export function renderRouletteOnly(){

  requestAnimationFrame(()=>{

    renderRoulette();
  });
}

// =========================
// LIST
// =========================
export function renderListsOnly(){

  requestAnimationFrame(()=>{

    renderLists();
  });
}
