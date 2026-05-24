import {
  getState
} from "../../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim
} from "../../state/actions.js";

import {
  renderRoulette
} from "../../ui/renderRoulette.js";

import {
  saveState
} from "../../../db/database.js";

import {
  SPIN_TOTAL_FRAME,
  SPIN_BASE_DELAY,
  SPIN_DELAY_STEP
} from "../../constants/animation.js";

// =========================
// WEIGHT
// =========================
const HISTORY_WEIGHT = {

  latest: 0.12,

  prev1: 0.3,

  prev2: 0.5,

  prev3: 0.7,

  normal: 1
};

// =========================
// SPIN ALL
// =========================
export async function spinAll(){

  const button =
    document.getElementById(
      "spinButton"
    );

  if(!button) return;

  button.disabled = true;

  button.innerText =
    "돌리는 중...";

  await Promise.all([

    animateRoulette("cap"),

    animateRoulette("swim")
  ]);

  triggerWinnerPulse();

  createConfetti();

  button.disabled = false;

  button.innerText =
    "오늘 뭐 입지?";
}

// =========================
// ANIMATE
// =========================
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

        Math.pow(
          frame,
          1.35
        ) *

        SPIN_DELAY_STEP;

      if(
        time - lastTime >
        delay
      ){

        const selected =
          pickWeightedItem(
            type,
            items
          );

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

        triggerShuffle(type);

        frame++;

        lastTime = time;
      }

      if(
        frame <
        SPIN_TOTAL_FRAME
      ){

        requestAnimationFrame(
          loop
        );
      }
      else{

        finalizeHistory(
          type
        );

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
// PICK WEIGHTED
// =========================
function pickWeightedItem(
  type,
  items
){

  const state =
    getState();

  const history =
    type === "cap"
      ? state.history.caps
      : state.history.swimsuits;

  const weighted =
    items.map(item=>{

      const recentIndex =
        history.indexOf(
          item.id
        );

      let weight =
        HISTORY_WEIGHT.normal;

      if(recentIndex === 0){

        weight =
          HISTORY_WEIGHT.latest;
      }
      else if(recentIndex === 1){

        weight =
          HISTORY_WEIGHT.prev1;
      }
      else if(recentIndex === 2){

        weight =
          HISTORY_WEIGHT.prev2;
      }
      else if(recentIndex === 3){

        weight =
          HISTORY_WEIGHT.prev3;
      }

      return {
        item,
        weight
      };
    });

  const total =
    weighted.reduce(

      (sum,current)=>

        sum +
        current.weight,

      0
    );

  let random =
    Math.random() * total;

  for(
    const entry of weighted
  ){

    random -=
      entry.weight;

    if(random <= 0){

      return entry.item;
    }
  }

  return items[0];
}

// =========================
// HISTORY
// =========================
function finalizeHistory(type){

  const state =
    getState();

  if(type === "cap"){

    const id =
      state.selection.capId;

    if(!id) return;

    state.history.caps =
      [
        id,
        ...state.history.caps.filter(
          itemId =>
            itemId !== id
        )
      ]
      .slice(0,4);
  }
  else{

    const id =
      state.selection.swimId;

    if(!id) return;

    state.history.swimsuits =
      [
        id,
        ...state.history.swimsuits.filter(
          itemId =>
            itemId !== id
        )
      ]
      .slice(0,4);
  }
}

// =========================
// SHUFFLE FX
// =========================
function triggerShuffle(type){

  const target =
    document.getElementById(

      type === "cap"
        ? "capResultName"
        : "swimResultName"
    );

  if(!target) return;

  target.classList.remove(
    "shuffle"
  );

  void target.offsetWidth;

  target.classList.add(
    "shuffle"
  );
}

// =========================
// WINNER
// =========================
function triggerWinnerPulse(){

  const cap =
    document.getElementById(
      "capResultName"
    );

  const swim =
    document.getElementById(
      "swimResultName"
    );

  if(cap){

    cap.classList.add(
      "winner-pulse"
    );

    setTimeout(()=>{

      cap.classList.remove(
        "winner-pulse"
      );

    },900);
  }

  if(swim){

    swim.classList.add(
      "winner-pulse"
    );

    setTimeout(()=>{

      swim.classList.remove(
        "winner-pulse"
      );

    },900);
  }
}

// =========================
// CONFETTI
// =========================
function createConfetti(){

  const colors = [

    "#c084fc",
    "#a855f7",
    "#d8b4fe",
    "#9333ea"
  ];

  for(
    let i = 0;
    i < 34;
    i++
  ){

    const confetti =
      document.createElement(
        "div"
      );

    confetti.className =
      "confetti";

    confetti.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    confetti.style.left =
      Math.random() * 100 +
      "%";

    confetti.style.width =
      8 + Math.random() * 8 +
      "px";

    confetti.style.height =
      10 + Math.random() * 12 +
      "px";

    confetti.style.opacity =
      0.9 + Math.random() * 0.1;

    confetti.style.setProperty(
      "--driftX",
      (
        Math.random() * 180 - 90
      ) + "px"
    );

    confetti.style.animationDelay =
      Math.random() * 0.18 +
      "s";

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.remove();

    }, 2600);
  }
}
