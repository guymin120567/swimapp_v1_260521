import {
  dom
} from "./dom.js";

import {
  getState
} from "../state/state.js";

// =========================
// ROULETTE
// =========================
export function renderRoulette(){

  const state =
    getState();

  const cap =
    state.data.caps.find(
      item =>
        item.id ===
        state.selection.capId
    );

  const swim =
    state.data.swimsuits.find(
      item =>
        item.id ===
        state.selection.swimId
    );

  // =========================
  // CAP
  // =========================

  if(dom.capResultName){

    dom.capResultName.innerText =
      cap?.name || "없음";
  }

  if(
    dom.capResultImage &&
    dom.capResultPlaceholder
  ){

    if(cap?.image){

      dom.capResultImage.src =
        cap.image;

      dom.capResultImage.style.display =
        "block";

      dom.capResultPlaceholder.style.display =
        "none";
    }
    else{

      dom.capResultImage.style.display =
        "none";

      dom.capResultPlaceholder.style.display =
        "flex";
    }
  }

  // =========================
  // SWIM
  // =========================

  if(dom.swimResultName){

    dom.swimResultName.innerText =
      swim?.name || "없음";
  }

  if(
    dom.swimResultImage &&
    dom.swimResultPlaceholder
  ){

    if(swim?.image){

      dom.swimResultImage.src =
        swim.image;

      dom.swimResultImage.style.display =
        "block";

      dom.swimResultPlaceholder.style.display =
        "none";
    }
    else{

      dom.swimResultImage.style.display =
        "none";

      dom.swimResultPlaceholder.style.display =
        "flex";
    }
  }

  // =========================
  // BUTTON
  // =========================

  const spinButton =
    document.getElementById(
      "spinButton"
    );

  if(spinButton){

    const canSpin =
      state.data.caps.length > 0 &&
      state.data.swimsuits.length > 0;

    spinButton.disabled =
      !canSpin;
  }
}
