import {
  getState
} from "./state.js";

// =========================
// ADD
// =========================
export function addCap(item){

  getState()
    .data
    .caps
    .push(item);
}

export function addSwim(item){

  getState()
    .data
    .swimsuits
    .push(item);
}

// =========================
// REMOVE
// =========================
export function removeCap(id){

  const state =
    getState();

  state.data.caps =
    state.data.caps.filter(
      item => item.id !== id
    );

  if(
    state.selection.capId === id
  ){

    state.selection.capId =
      null;
  }

  if(
    state.ui.activeCapId === id
  ){

    state.ui.activeCapId =
      state.data.caps[0]?.id ||
      null;
  }
}

export function removeSwim(id){

  const state =
    getState();

  state.data.swimsuits =
    state.data.swimsuits.filter(
      item => item.id !== id
    );

  if(
    state.selection.swimId === id
  ){

    state.selection.swimId =
      null;
  }

  if(
    state.ui.activeSwimId === id
  ){

    state.ui.activeSwimId =
      state.data.swimsuits[0]?.id ||
      null;
  }
}

// =========================
// SELECT
// =========================
export function setSelectedCap(id){

  getState()
    .selection
    .capId = id;
}

export function setSelectedSwim(id){

  getState()
    .selection
    .swimId = id;
}

// =========================
// ACTIVE
// =========================
export function setActiveCap(id){

  getState()
    .ui
    .activeCapId = id;
}

export function setActiveSwim(id){

  getState()
    .ui
    .activeSwimId = id;
}
