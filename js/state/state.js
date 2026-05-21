export const defaultState = {

  caps: [],

  swimsuits: [],

  selectedCap: null,

  selectedSwim: null
};

let currentState =
  structuredClone(defaultState);

export function getState(){

  return currentState;
}

export function setState(next){

  currentState = next;
}
