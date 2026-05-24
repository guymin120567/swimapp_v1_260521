import {
  getState
} from "./state.js";

// =========================
// SET CAP
// =========================
export function setSelectedCap(id) {

  const state =
    getState();

  state.selection.capId =
    id;
}

// =========================
// SET SWIM
// =========================
export function setSelectedSwim(id) {

  const state =
    getState();

  state.selection.swimId =
    id;
}
