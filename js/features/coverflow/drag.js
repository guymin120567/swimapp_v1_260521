import {
  getState
} from "../../state/state.js";

import {
  setActiveCap,
  setActiveSwim
} from "../../state/actions.js";

import {
  renderLists
} from "../../ui/render.js";

// =========================
// DRAG
// =========================
export function bindDrag(){

  let dragging = false;

  let currentType = null;

  let startX = 0;

  let currentIndex = 0;

  let moved = false;

  document.addEventListener(
    "pointerdown",
    e=>{

      const card =
        e.target.closest(
          ".cover-card"
        );

      if(!card) return;

      dragging = true;

      moved = false;

      currentType =
        card.dataset.type;

      startX =
        e.clientX;

      const state =
        getState();

      currentIndex =
        currentType === "cap"
        ? state.activeCapIndex
        : state.activeSwimIndex;
    }
  );

  document.addEventListener(
    "pointermove",
    e=>{

      if(!dragging) return;

      const diff =
        e.clientX - startX;

      if(Math.abs(diff) > 12){

        moved = true;
      }

      const threshold = 58;

      if(Math.abs(diff) > threshold){

        if(diff < 0){

          currentIndex++;
        }
        else{

          currentIndex--;
        }

        updateIndex();

        startX =
          e.clientX;
      }
    }
  );

  document.addEventListener(
    "pointerup",
    ()=>{

      dragging = false;

      moved = false;
    }
  );

  function updateIndex(){

    const state =
      getState();

    if(currentType === "cap"){

      currentIndex =
        clamp(
          currentIndex,
          0,
          state.caps.length - 1
        );

      setActiveCap(
        currentIndex
      );
    }
    else{

      currentIndex =
        clamp(
          currentIndex,
          0,
          state.swimsuits.length - 1
        );

      setActiveSwim(
        currentIndex
      );
    }

    renderLists();

    scrollActiveIntoView(
      currentType,
      currentIndex
    );
  }
}

// =========================
// SCROLL
// =========================
function scrollActiveIntoView(
  type,
  index
){

  requestAnimationFrame(()=>{

    const card =
      document.querySelector(
        `.cover-card[data-type="${type}"][data-index="${index}"]`
      );

    if(card){

      card.scrollIntoView({

        behavior:"smooth",

        inline:"center",

        block:"nearest"
      });
    }
  });
}

// =========================
// UTIL
// =========================
function clamp(
  value,
  min,
  max
){

  return Math.min(
    Math.max(value,min),
    max
  );
}
