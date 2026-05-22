import {
  getState
} from "../../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim
} from "../../state/actions.js";

import {
  renderRoulette
} from "../../ui/render.js";

import {
  saveState
} from "../../core/db.js";

// =========================
// SPIN ALL
// =========================
export async function spinAll(){

  await Promise.all([

    animateRoulette("cap"),

    animateRoulette("swim")
  ]);
}

// =========================
// ANIMATION
// =========================
export async function animateRoulette(type){

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

      if(
        time - lastTime >
        70 + frame * 12
      ){

        const randomIndex =
          Math.floor(
            Math.random() *
            items.length
          );

        const selected =
          items[randomIndex];

        if(type === "cap"){

          setSelectedCap(
            selected
          );
        }
        else{

          setSelectedSwim(
            selected
          );
        }

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
