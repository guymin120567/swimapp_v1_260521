export const defaultState = {

  data: {

    caps: [],

    swimsuits: []
  },

  selection: {

    capId: null,

    swimId: null
  },

  history: {

    caps: [],

    swimsuits: []
  },

  ui: {

    activeCapIndex: 0,

    activeSwimIndex: 0,

    isSpinning: false
  }
};

const state =
  structuredClone(
    defaultState
  );

// =========================
// GET
// =========================
export function getState(){

  return state;
}

// =========================
// SET
// =========================
export function setState(newState){

  Object.assign(
    state,
    newState
  );
}
