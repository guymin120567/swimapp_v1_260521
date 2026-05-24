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

  state.history.caps =
    state.history.caps.filter(
      itemId => itemId !== id
    );

  if(
    state.selection.capId === id
  ){
    state.selection.capId = null;
  }
}

export function removeSwim(id){

  const state =
    getState();

  state.data.swimsuits =
    state.data.swimsuits.filter(
      item => item.id !== id
    );

  state.history.swimsuits =
    state.history.swimsuits.filter(
      itemId => itemId !== id
    );

  if(
    state.selection.swimId === id
  ){
    state.selection.swimId = null;
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
export function setActiveCap(index){

  getState()
    .ui
    .activeCapIndex = index;
}

export function setActiveSwim(index){

  getState()
    .ui
    .activeSwimIndex = index;
}
