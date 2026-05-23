export const defaultState = {

  data:{

    caps:[],

    swimsuits:[]
  },

  // =========================
  // SELECTED OBJECT
  // =========================
  selection:{

    cap:null,

    swim:null
  },

  ui:{

    activeCapIndex:0,

    activeSwimIndex:0,

    isSpinning:false
  }
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
