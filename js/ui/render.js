// render.js

import { renderLayout } from "./renderLayout.js";
import { renderRoulette } from "./renderRoulette.js";
import { renderLists } from "./renderCoverflow.js";

// =========================
// FULL RENDER
// =========================
export function renderApp() {

  // DOM 의존성 때문에 layout 먼저
  renderLayout();

  // 다음 프레임에서 하위 렌더 (DOM 안정화)
  requestAnimationFrame(() => {
    renderRoulette();
    renderLists();
  });
}

// =========================
// SAFE RERENDER (전체 UI)
// =========================
export function rerenderAll() {
  requestAnimationFrame(() => {
    renderRoulette();
    renderLists();
  });
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
