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

  // =========================
  // LAYOUT 먼저 생성
  // =========================
  renderLayout();

  // =========================
  // 실제 데이터 렌더
  // =========================
  renderRoulette();

  renderLists();
}

// =========================
// ROULETTE ONLY
// =========================
export function renderRouletteOnly(){

  renderRoulette();
}

// =========================
// LIST ONLY
// =========================
export function renderListsOnly(){

  renderLists();
}
