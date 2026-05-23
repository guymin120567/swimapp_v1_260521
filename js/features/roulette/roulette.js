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
} from "../../../db/database.js";

import {
  SPIN_TOTAL_FRAME,
  SPIN_BASE_DELAY,
  SPIN_DELAY_STEP
} from "../../constants/animation.js";

export async function spinAll(){

  const button =
    document.querySelector(
      ".spin-btn"
    );

  button.disabled = true;

  button.innerText =
    "돌리는 중...";

  await Promise.all([

    animateRoulette("cap"),

    animateRoulette("swim")
  ]);

  button.disabled = false;

  button.innerText =
    "오늘 뭐 입지?";
}

export async function animateRoulette(type){

  const state =
    getState();

  const items =
    type === "cap"
    ? state.data.caps
    : state.data.swimsuits;

  if(!items.length) return;

  return new Promise(resolve=>{

    let frame = 0;

    let lastTime = 0;

    function loop(time){

      const delay =
        SPIN_BASE_DELAY +
        Math.pow(frame,1.35) *
        SPIN_DELAY_STEP;

      if(time - lastTime > delay){

        const randomIndex =
          Math.floor(
            Math.random() *
            items.length
          );

        const selected =
          items[randomIndex];

        if(type === "cap"){

          setSelectedCap(
            selected.id
          );
        }
        else{

          setSelectedSwim(
            selected.id
          );
        }

        renderRoulette();

        frame++;

        lastTime = time;
      }

      if(frame < SPIN_TOTAL_FRAME){

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
