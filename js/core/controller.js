import {
  getState,
  setState,
  defaultState
} from "../state/state.js";

import {
  addCap,
  addSwim,
  removeCap,
  removeSwim,
  setActiveCap,
  setActiveSwim
} from "../state/actions.js";

import {
  renderApp,
  renderListsOnly,
  renderRouletteOnly
} from "../ui/render.js";

import {
  initDOM
} from "../ui/dom.js";

import {
  saveState,
  loadState
} from "../../db/database.js";

import {
  compressImage
} from "../utils/image.js";

import {
  spinAll
} from "../features/roulette/roulette.js";

import {
  bindDrag
} from "../features/coverflow/drag.js";

// =========================
// INIT
// =========================
export function initController(){

  async function boot(){

    initDOM();

    bindGlobal();

    bindDrag();

    const saved =
      await loadState();

    if(saved){

      setState(saved);
    }
    else{

      setState(
        structuredClone(
          defaultState
        )
      );
    }

    normalizeState();

    renderApp();
  }

  // =========================
  // NORMALIZE
  // =========================
  function normalizeState(){

    const state =
      getState();

    setState({

      data:{

        caps:
          state.data?.caps || [],

        swimsuits:
          state.data?.swimsuits || []
      },

      selection:{

        capId:
          state.selection?.capId || null,

        swimId:
          state.selection?.swimId || null
      },

      ui:{

        activeCapIndex:
          state.ui?.activeCapIndex || 0,

        activeSwimIndex:
          state.ui?.activeSwimIndex || 0,

        isSpinning:false
      }
    });
  }

  // =========================
  // SAVE
  // =========================
  async function persist(){

    await saveState(
      getState()
    );
  }

  // =========================
  // ADD
  // =========================
  async function submitSelectedItem(){

    const type =
      document.getElementById(
        "itemType"
      ).value;

    const text =
      document.getElementById(
        "itemText"
      ).value.trim();

    const file =
      document.getElementById(
        "itemImage"
      ).files[0];

    if(!text){

      alert("이름 입력");

      return;
    }

    let image = null;

    if(file){

      image =
        await compressImage(file);
    }

    const item = {

      id:Date.now(),

      name:text,

      image
    };

    if(type === "cap"){

      addCap(item);
    }
    else{

      addSwim(item);
    }

    document.getElementById(
      "itemText"
    ).value = "";

    document.getElementById(
      "itemImage"
    ).value = "";

    renderListsOnly();

    await persist();
  }

  // =========================
  // REMOVE
  // =========================
  async function removeItem(
    type,
    id
  ){

    const ok = confirm(
      "정말 삭제할까요?"
    );

    if(!ok) return;

    if(type === "cap"){

      removeCap(id);
    }
    else{

      removeSwim(id);
    }

    renderListsOnly();

    await persist();
  }

  // =========================
  // ACTIVE
  // =========================
  function setActiveIndex(
    type,
    index
  ){

    if(type === "cap"){

      setActiveCap(index);
    }
    else{

      setActiveSwim(index);
    }

    renderListsOnly();
  }

  // =========================
  // EVENTS
  // =========================
  function bindGlobal(){

    document.addEventListener(
      "click",
      async e=>{

        const action =
          e.target.dataset.action;

        if(action === "spin"){

          await spinAll();

          renderRouletteOnly();
        }

        if(action === "add"){

          await submitSelectedItem();
        }

        const removeBtn =
          e.target.closest(
            ".delete-btn"
          );

        if(removeBtn){

          e.stopPropagation();

          await removeItem(
            removeBtn.dataset.type,
            Number(
              removeBtn.dataset.id
            )
          );
        }

        const card =
          e.target.closest(
            ".cover-card"
          );

        if(card){

          setActiveIndex(
            card.dataset.type,
            Number(
              card.dataset.index
            )
          );
        }
      }
    );
  }

  return {
    boot
  };
}
