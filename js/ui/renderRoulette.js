import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

// =========================
// RENDER
// =========================
export function renderRoulette(){

  const state =
    getState();

  const selectedCap =
    state.data.caps.find(
      item =>
        item.id ===
        state.selection.capId
    );

  const selectedSwim =
    state.data.swimsuits.find(
      item =>
        item.id ===
        state.selection.swimId
    );

  updateRouletteCard(
    "cap",
    selectedCap
  );

  updateRouletteCard(
    "swim",
    selectedSwim
  );
}

// =========================
// CARD
// =========================
function updateRouletteCard(
  type,
  item
){

  const image =
    type === "cap"
    ? dom.capResultImage
    : dom.swimResultImage;

  const name =
    type === "cap"
    ? dom.capResultName
    : dom.swimResultName;

  const placeholder =
    document.getElementById(
      type === "cap"
      ? "capResultPlaceholder"
      : "swimResultPlaceholder"
    );

  // =========================
  // NULL GUARD
  // =========================
  if(
    !image ||
    !name ||
    !placeholder
  ){
    return;
  }

  // =========================
  // EMPTY
  // =========================
  if(!item){

    image.style.display =
      "none";

    placeholder.style.display =
      "flex";

    name.innerText =
      "없음";

    return;
  }

  // =========================
  // TITLE
  // =========================
  name.innerText =
    item.name;

  // =========================
  // IMAGE
  // =========================
  if(item.image){

    image.src =
      item.image;

    image.style.display =
      "block";

    placeholder.style.display =
      "none";
  }
  else{

    image.style.display =
      "none";

    placeholder.style.display =
      "flex";
  }
}
