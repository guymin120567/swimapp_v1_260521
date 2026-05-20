export const defaultState = {

  swimsuits: [],

  caps: [],

  preview: null,

  spinning: false
};

let currentState =
  structuredClone(defaultState);

export function getState() {
  return currentState;
}

export function setInternalState(next) {
  currentState = next;
}
