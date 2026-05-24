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

    // =========================
    // DOM
    // =========================
    initDOM();

    // =========================
    // LOAD
    // =========================
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

    // =========================
    // NORMALIZE
    // =========================
    normalizeState();

    // =========================
    // RENDER
    // =========================
    renderApp();

    // =========================
    // EVENTS
    // =========================
    bindGlobal();

    // =========================
    // DRAG
    // =========================
    bindDrag();
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
          Array.isArray(
            state.data?.caps
          )
            ? state.data.caps
            : [],

        swimsuits:
          Array.isArray(
            state.data?.swimsuits
          )
            ? state.data.swimsuits
            : []
      },

      selection:{

        capId:
          state.selection?.capId || null,

        swimId:
          state.selection?.swimId || null
      },

      history:{

        caps:
          Array.isArray(
            state.history?.caps
          )
            ? state.history.caps
            : [],

        swimsuits:
          Array.isArray(
            state.history?.swimsuits
          )
            ? state.history.swimsuits
            : []
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

    const typeEl =
      document.getElementById(
        "itemType"
      );

    const textEl =
      document.getElementById(
        "itemText"
      );

    const imageEl =
      document.getElementById(
        "itemImage"
      );

    if(
      !typeEl ||
      !textEl ||
      !imageEl
    ){
      return;
    }

    const type =
      typeEl.value;

    const text =
      textEl.value.trim();

    const file =
      imageEl.files?.[0];

    if(!text){

      alert(
        "이름 입력"
      );

      return;
    }

    let image = null;

    if(file){

      image =
        await compressImage(
          file
        );
    }

    const item = {

      id:
        crypto.randomUUID(),

      name:text,

      image
    };

    if(type === "cap"){

      addCap(item);
    }
    else{

      addSwim(item);
    }

    textEl.value = "";

    imageEl.value = "";

    renderListsOnly();

    renderRouletteOnly();

    await persist();
  }

  // =========================
  // REMOVE
  // =========================
  async function removeItem(
    type,
    id
  ){

    const ok =
      confirm(
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

    renderRouletteOnly();

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

        // =========================
        // SPIN
        // =========================
        if(action === "spin"){

          await spinAll();

          renderRouletteOnly();

          return;
        }

        // =========================
        // ADD
        // =========================
        if(action === "add"){

          await submitSelectedItem();

          return;
        }

        // =========================
        // DELETE
        // =========================
        const removeBtn =
          e.target.closest(
            ".delete-btn"
          );

        if(removeBtn){

          e.stopPropagation();

          await removeItem(

            removeBtn.dataset.type,

            String(
              removeBtn.dataset.id
            )
          );

          return;
        }

        // =========================
        // ACTIVE
        // =========================
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
