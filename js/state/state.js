// state.js

export const defaultState = {
  data: {
    caps: [],
    swimsuits: []
  },

  selection: {
    cap: null,
    swim: null
  },

  ui: {
    activeCapIndex: 0,
    activeSwimIndex: 0,
    isSpinning: false
  }
};

let currentState = structuredClone(defaultState);

// =========================
// GET
// =========================
export function getState() {
  return currentState;
}

// =========================
// SET (전체 교체)
// =========================
export function setState(nextState) {
  currentState = structuredClone(nextState);
}

// =========================
// RESET
// =========================
export function resetState() {
  currentState = structuredClone(defaultState);
}
