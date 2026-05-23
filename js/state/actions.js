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

export function removeCap(id){

  const state =
    getState();

  setState({

    ...state,

    data:{

      ...state.data,

      caps:
        state.data.caps.filter(
          item => item.id !== id
        )
    }
  });
}

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

export function setSelectedCap(id){

  const state =
    getState();

  setState({

    ...state,

    selection:{

      ...state.selection,

      capId:id
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

export function removeSwim(id){

  const state =
    getState();

  setState({

    ...state,

    data:{

      ...state.data,

      swimsuits:
        state.data.swimsuits.filter(
          item => item.id !== id
        )
    }
  });
}

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

export function setSelectedSwim(id){

  const state =
    getState();

  setState({

    ...state,

    selection:{

      ...state.selection,

      swimId:id
    }
  });
}
