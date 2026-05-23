import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

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

  if(!item){

    image.style.display =
      "none";

    placeholder.style.display =
      "flex";

    name.innerText =
      "없음";

    return;
  }

  name.innerText =
    item.name;

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
