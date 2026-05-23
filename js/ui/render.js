import {
  renderRoulette
} from "./renderRoulette.js";

import {
  renderLists
} from "./renderCoverflow.js";

// =========================
// FULL RENDER
// =========================
export function renderApp(){

  renderRouletteOnly();

  renderListsOnly();
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
// LISTS
// =========================
export function renderListsOnly(){

  requestAnimationFrame(()=>{

    renderLists();
  });
}
