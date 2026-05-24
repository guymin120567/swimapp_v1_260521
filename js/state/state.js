export const defaultState = {

  data:{

    caps:[],

    swimsuits:[]
  },

  selection:{

    capId:null,

    swimId:null
  },

  history:{

    caps:[],

    swimsuits:[]
  },

  ui:{

    activeCapIndex:0,

    activeSwimIndex:0,

    isSpinning:false
  }
};

// =========================
// STATE
// =========================
let state =

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
export function setState(
  newState
){

  state = newState;
}

// =========================
// RESET
// =========================
export function resetState(){

  state =
    structuredClone(
      defaultState
    );
}
