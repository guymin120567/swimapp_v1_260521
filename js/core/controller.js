import {
  getState,
  setState,
  defaultState
} from "../state/state.js";

import {
  renderApp
} from "../ui/render.js";

import {
  saveState,
  loadState
} from "./db.js";

import {
  compressImage
} from "../utils/image.js";

// =========================
// INIT
// =========================
export function initController(){

  async function boot(){

    bindGlobal();
    bindDrag();

    const saved =
      await loadState();

    if(saved){

      setState(saved);
    }
    else{

      setState(
        structuredClone(
          defaultState
        )
      );
    }

    renderApp();
  }

  // =========================
  // UPDATE
  // =========================
  async function update({
    save = true
  } = {}){

    if(save){

      await saveState(
        getState()
      );
    }

    renderApp();
  }

  // =========================
  // ADD
  // =========================
  async function submitSelectedItem(){
}
