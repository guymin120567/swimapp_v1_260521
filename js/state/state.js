const state = {

  data: {

    caps: [],

    swimsuits: []
  },

  selection: {

    capId: null,

    swimId: null
  },

  history: {

    caps: [],

    swimsuits: []
  }
};

// =========================
// GET STATE
// =========================
export function getState() {

  return state;
}
