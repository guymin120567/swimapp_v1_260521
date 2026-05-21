import {
  saveState,
  loadState,
  saveImage,
  loadImage,
  deleteImage
} from "../../db/database.js";

import {
  compressImage
} from "../utils/image.js";

import {
  defaultState,
  getState,
  setInternalState
} from "../state/state.js";

// =========================
// ADD ITEM
// =========================
async function addItem(){

  const textInput =
    document.getElementById(
      "itemText"
    );

  const fileInput =
    document.getElementById(
      "itemImage"
    );

  const typeInput =
    document.getElementById(
      "itemType"
    );

  const text =
    textInput.value.trim();

  if(!text){
    return;
  }

  const file =
    fileInput.files[0];

  let imageId = null;

  // =========================
  // SAVE IMAGE
  // =========================
  if(file){

    imageId =
      "img_" + Date.now();

    const compressed =
      await compressImage(file);

    await saveImage(
      imageId,
      compressed
    );
  }

  const item = {
    id: Date.now(),
    text,
    imageId
  };

  const state = getState();

  if(typeInput.value === "swimsuit"){

    state.swimsuits.push(item);
  }
  else{

    state.caps.push(item);
  }

  await saveState(state);

  render();
}

// =========================
// REMOVE ITEM
// =========================
async function removeItem(
  type,
  id
){

  const state = getState();

  const list =
    type === "swimsuit"
    ? state.swimsuits
    : state.caps;

  const target =
    list.find(
      item => item.id === id
    );

  if(
    target &&
    target.imageId
  ){
    await deleteImage(
      target.imageId
    );
  }

  const filtered =
    list.filter(
      item => item.id !== id
    );

  if(type === "swimsuit"){
    state.swimsuits = filtered;
  }
  else{
    state.caps = filtered;
  }

  await saveState(state);

  render();
}
