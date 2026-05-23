import {
  getState,
  setState
} from "./state.js";

// =========================
// UPDATE
// =========================
function updateState(mutator){

  const next =
    structuredClone(
      getState()
    );

  mutator(next);

  setState(next);
}

// =========================
// DATA
// =========================
export function setData(data){

  updateState(state=>{

    state.data = data;
  });
}

// =========================
// ACTIVE
// =========================
export function setActiveCap(index){

  updateState(state=>{

    state.ui.activeCapIndex =
      index;
  });
}

export function setActiveSwim(index){

  updateState(state=>{

    state.ui.activeSwimIndex =
      index;
  });
}

// =========================
// SELECT
// =========================
export function setSelectedCap(cap){

  updateState(state=>{

    state.selection.cap =
      cap;
  });
}

export function setSelectedSwim(swim){

  updateState(state=>{

    state.selection.swim =
      swim;
  });
}

// =========================
// SPINNING
// =========================
export function setSpinning(value){

  updateState(state=>{

    state.ui.isSpinning =
      value;
  });
}
