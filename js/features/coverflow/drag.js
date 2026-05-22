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

        setActiveCap(next);
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

        setActiveSwim(next);
      }

      renderLists();

      currentFlow = null;
    }
  );
}

// =========================
// UTIL
// =========================
function clamp(value,min,max){

  return Math.min(
    Math.max(value,min),
    max
  );
}
