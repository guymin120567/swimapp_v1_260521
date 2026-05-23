export const defaultState = {

  data:{

    caps:[],

    swimsuits:[]
  },

  selection:{

    capId:null,

    swimId:null
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
