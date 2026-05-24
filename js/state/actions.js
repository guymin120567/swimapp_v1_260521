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

    data:{

      ...state.data,

      caps:[
        ...state.data.caps,
        item
      ]
    }
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

    data:{

      ...state.data,

      swimsuits:[
        ...state.data.swimsuits,
        item
      ]
    }
  });
}

// =========================
// REMOVE CAP
// =========================
export function removeCap(id){

  const state =
    getState();

  setState({

    ...state,

    data:{

      ...state.data,

      caps:
        state.data.caps.filter(
          item=>item.id !== id
        )
    }
  });
}

// =========================
// REMOVE SWIM
// =========================
export function removeSwim(id){

  const state =
    getState();

  setState({

    ...state,

    data:{

      ...state.data,

      swimsuits:
        state.data.swimsuits.filter(
          item=>item.id !== id
        )
    }
  });
}

// =========================
// ACTIVE CAP
// =========================
export function setActiveCap(index){

  const state =
    getState();

  setState({

    ...state,

    ui:{

      ...state.ui,

      activeCapIndex:index
    }
  });
}

// =========================
// ACTIVE SWIM
// =========================
export function setActiveSwim(index){

  const state =
    getState();

  setState({

    ...state,

    ui:{

      ...state.ui,

      activeSwimIndex:index
    }
  });
}
