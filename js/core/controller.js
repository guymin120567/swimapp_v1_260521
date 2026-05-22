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

    normalizeState();

    renderApp();
  }

  // =========================
  // STATE NORMALIZE
  // =========================
  function normalizeState(){

    const state = getState();

    setState({

      caps:
        state.caps || [],

      swimsuits:
        state.swimsuits || [],

      selectedCap:
        state.selectedCap || null,

      selectedSwim:
        state.selectedSwim || null,

      activeCapIndex:
        state.activeCapIndex || 0,

      activeSwimIndex:
        state.activeSwimIndex || 0
    });
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

    const state =
      getState();

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

    const state =
      getState();

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

    renderLists();

    await saveState(
      getState()
    );
  }

  // =========================
  // ACTIVE
  // =========================
  function setActiveIndex(
    type,
    index
  ){

    const state =
      getState();

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
  // RAF ANIMATION
  // =========================
  async function animateRoulette(type){

    const state =
      getState();

    const items =
      type === "cap"
      ? state.caps
      : state.swimsuits;

    if(!items.length) return;

    return new Promise(resolve=>{

      let frame = 0;

      let lastTime = 0;

      function loop(time){

        if(time - lastTime > 70 + frame * 12){

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

          frame++;

          lastTime = time;
        }

        if(frame < 14){

          requestAnimationFrame(
            loop
          );
        }
        else{

          saveState(
            getState()
          );

          resolve();
        }
      }

      requestAnimationFrame(
        loop
      );
    });
  }

  // =========================
  // DRAG
  // =========================
  function bindDrag(){

    let currentFlow = null;

    let startX = 0;

    let lastX = 0;

    let velocity = 0;

    document.addEventListener(
      "pointerdown",
      e=>{

        const flow =
          e.target.closest(
            ".coverflow"
          );

        if(!flow) return;

        currentFlow = flow;

        startX = e.clientX;

        lastX = e.clientX;

        velocity = 0;
      }
    );

    document.addEventListener(
      "pointermove",
      e=>{

        if(!currentFlow) return;

        velocity =
          e.clientX - lastX;

        lastX =
          e.clientX;
      }
    );

    document.addEventListener(
      "pointerup",
      ()=>{

        if(!currentFlow) return;

        const diff =
          startX - lastX;

        const type =
          currentFlow.id === "capList"
          ? "cap"
          : "swim";

        const state =
          getState();

        if(
          Math.abs(diff) < 40 &&
          Math.abs(velocity) < 3
        ){

          currentFlow = null;

          return;
        }

        const direction =
          diff > 0 || velocity < -2
          ? 1
          : -1;

        if(type === "cap"){

          let next =
            state.activeCapIndex +
            direction;

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
            state.activeSwimIndex +
            direction;

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

function clamp(value,min,max){

  return Math.min(
    Math.max(value,min),
    max
  );
}
