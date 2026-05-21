export const defaultState = {

  caps: [],

  swimsuits: [],

  selectedCap: null,

  selectedSwim: null,

  activeCapIndex: 0,

  activeSwimIndex: 0
};

let currentState =
  structuredClone(
    defaultState
  );

export function getState(){

  return currentState;
}

export function setState(next){

  currentState = next;
}
