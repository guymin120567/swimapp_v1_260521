import {
  getState
} from "../../state/state.js";

import {
  renderCoverflow
} from "./renderCoverflow.js";

// =========================
// REFRESH
// =========================
export function refreshCoverflow(){

  const state =
    getState();

  renderCoverflow({

    type: "cap",

    targetId: "capCoverflow",

    items: state.data.caps
  });

  renderCoverflow({

    type: "swim",

    targetId: "swimCoverflow",

    items: state.data.swimsuits
  });
}

// =========================
// REFRESH ONE
// =========================
export function refreshSingleCoverflow(
  type
){

  const state =
    getState();

  if(type === "cap"){

    renderCoverflow({

      type: "cap",

      targetId: "capCoverflow",

      items: state.data.caps
    });

    return;
  }

  renderCoverflow({

    type: "swim",

    targetId: "swimCoverflow",

    items: state.data.swimsuits
  });
}
