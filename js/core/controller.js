import {
  getState,
  setState,
  defaultState
} from "../state/state.js";

import {
  renderApp,
  renderRoulette,
  renderLists
} from "../ui/render.js";

import {
  initDOM
} from "../ui/dom.js";

import {
  saveState,
  loadState
} from "./db.js";

import {
  compressImage
} from "../utils/image.js";

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

    renderApp();
  }

  // =========================
  // UPDATE
  // =========================
  async function update(){

    await saveState(
      getState()
    );

    renderApp();
  }

  // =========================
  // ADD ITEM
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

    const state = getState();

    const item = {

      id: Date.now(),

      name:text,

      image
    };

    if(type === "cap"){

      setState({
        ...state,

        caps:[
          ...state.caps,
          item
        ]
      });
    }
    else{

      setState({
        ...state,

        swimsuits:[
          ...state.swimsuits,
          item
        ]
      });
    }

    document.getElementById(
      "itemText"
    ).value = "";

    document.getElementById(
      "itemImage"
    ).value = "";

    await update();
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

    const state = getState();

    if(type === "cap"){

      setState({
        ...state,

        caps:
          state.caps.filter(
            item => item.id !== id
          )
      });
    }
    else{

      setState({
        ...state,

        swimsuits:
          state.swimsuits.filter(
            item => item.id !== id
          )
      });
    }

    await update();
  }

  // =========================
  // ACTIVE
  // =========================
  function setActiveIndex(
    type,
    index
  ){

    const state = getState();

    if(type === "cap"){

      setState({
        ...state,

        activeCapIndex:index
      });
    }
    else{

      setState({
        ...state,

        activeSwimIndex:index
      });
    }

    renderLists();
  }

  // =========================
  // SPIN
  // =========================
  async function spinAll(){

    await Promise.all([

      animateRoulette("cap"),

      animateRoulette("swim")
    ]);
  }

  // =========================
  // ANIMATION
  // =========================
  async function animateRoulette(type){

    const state = getState();

    const items =
      type === "cap"
      ? state.caps
      : state.swimsuits;

    if(!items.length) return;

    for(let i=0;i<14;i++){

      const randomIndex =
        Math.floor(
          Math.random() *
          items.length
        );

      const selected =
        items[randomIndex];

      if(type === "cap"){

        state.selectedCap =
          selected;
      }
      else{

        state.selectedSwim =
          selected;
      }

      setState({
        ...state
      });

      renderRoulette();

      await sleep(
        70 + i * 15
      );
    }

    await saveState(
      getState()
    );
  }

  // =========================
  // DRAG
  // =========================
  function bindDrag(){

    let currentFlow = null;

    document.addEventListener(
      "pointerdown",
      e=>{

        const flow =
          e.target.closest(
            ".coverflow"
          );

        if(!flow) return;

        currentFlow = flow;

        currentFlow.dataset.startX =
          e.clientX;
      }
    );

    document.addEventListener(
      "pointerup",
      e=>{

        if(!currentFlow) return;

        const startX = Number(
          currentFlow.dataset.startX || 0
        );

        const diff =
          startX - e.clientX;

        const type =
          currentFlow.id === "capList"
          ? "cap"
          : "swim";

        const state = getState();

        if(
          Math.abs(diff) < 40
        ){
          currentFlow = null;
          return;
        }

        if(type === "cap"){

          let next =
            state.activeCapIndex;

          next += diff > 0 ? 1 : -1;

          next = clamp(
            next,
            0,
            state.caps.length - 1
          );

          setActiveIndex(
            type,
            next
          );
        }
        else{

          let next =
            state.activeSwimIndex;

          next += diff > 0 ? 1 : -1;

          next = clamp(
            next,
            0,
            state.swimsuits.length - 1
          );

          setActiveIndex(
            type,
            next
          );
        }

        currentFlow = null;
      }
    );
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

// =========================
// UTIL
// =========================
function sleep(ms){

  return new Promise(resolve=>{

    setTimeout(resolve,ms);
  });
}

function clamp(value,min,max){

  return Math.min(
    Math.max(value,min),
    max
  );
}
