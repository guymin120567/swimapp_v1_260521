// controller.js

import { getState, setState } from "../state/state.js";
import { loadState, saveState } from "../database/database.js";
import { renderApp } from "../view/render.js";

export function initController() {

  // =========================
  // BOOT
  // =========================
  async function boot() {

    const loaded = await loadState();

    console.log("LOADED STATE:", loaded);

    if (loaded) {
      setState(loaded);
    }

    renderApp();
  }

  // =========================
  // 예시: 선택 저장
  // =========================
  async function persist() {
    const state = getState();
    await saveState(state);
  }

  return {
    boot,
    persist
  };
}
