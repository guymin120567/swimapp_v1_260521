import {
  getState,
  setState
} from "./state.js";

// =========================
// CAP
// =========================
export function addCap(item){

  const state =
    getState();

  setState({

    ...state,

    caps:[
      ...state.caps,
      item
    ]
  });
}

export function removeCap(id){

  const state =
    getState();

  setState({

    ...state,

    caps:
      state.caps.filter(
        item => item.id !== id
      )
  });
}

export function setActiveCap(index){

  const state =
    getState();

  setState({

    ...state,

    activeCapIndex:index
  });
}

export function setSelectedCap(item){

  const state =
    getState();

  setState({

    ...state,

    selectedCap:item
  });
}

// =========================
// SWIM
// =========================
export function addSwim(item){

  const state =
    getState();

  setState({

    ...state,

    swimsuits:[
      ...state.swimsuits,
      item
    ]
  });
}

export function removeSwim(id){

  const state =
    getState();

  setState({

    ...state,

    swimsuits:
      state.swimsuits.filter(
        item => item.id !== id
      )
  });
}

export function setActiveSwim(index){

  const state =
    getState();

  setState({

    ...state,

    activeSwimIndex:index
  });
}

export function setSelectedSwim(item){

  const state =
    getState();

  setState({

    ...state,

    selectedSwim:item
  });
}
