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
    // EVENT
    // =========================
    bindGlobal();

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
  // ADD ITEM
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
      console.error(
        "INPUT DOM NOT FOUND"
      );

      return;
    }

    const type =
      typeEl.value;

    const text =
      textEl.value.trim();

    const file =
      imageEl.files?.[0];

    // =========================
    // VALIDATION
    // =========================
    if(!text){

      alert(
        "이름 입력"
      );

      return;
    }

    let image = null;

    // =========================
    // IMAGE
    // =========================
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

    // =========================
    // ADD
    // =========================
    if(type === "cap"){

      addCap(item);
    }
    else{

      addSwim(item);
    }

    // =========================
    // RESET
    // =========================
    textEl.value = "";

    imageEl.value = "";

    // =========================
    // RENDER
    // =========================
    renderListsOnly();

    renderRouletteOnly();

    // =========================
    // REBIND DRAG
    // =========================
    bindDrag();

    // =========================
    // SAVE
    // =========================
    await persist();
  }

  // =========================
  // REMOVE ITEM
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

    // =========================
    // RENDER
    // =========================
    renderListsOnly();

    renderRouletteOnly();

    // =========================
    // REBIND DRAG
    // =========================
    bindDrag();

    // =========================
    // SAVE
    // =========================
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

    bindDrag();
  }

  // =========================
  // EVENTS
  // =========================
  function bindGlobal(){

    document.addEventListener(
      "click",
      async e=>{

        // =========================
        // ACTION
        // =========================
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

            removeBtn.dataset.id
          );

          return;
        }

        // =========================
        // ACTIVE CARD
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
