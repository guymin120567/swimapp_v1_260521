const state = {

  ui: {

    activeTab: "roulette",

    activeCapId: null,

    activeSwimId: null
  },

  selection: {

    cap: null,

    swim: null
  },

  data: {

    caps: [],

    swims: [],

    records: []
  }
};

export function getState(){

  return state;
}

export function setActiveTab(tab){

  state.ui.activeTab = tab;
}

export function setActiveCap(id){

  state.ui.activeCapId = id;
}

export function setActiveSwim(id){

  state.ui.activeSwimId = id;
}
