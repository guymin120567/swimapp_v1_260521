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
// ROULETTE
// =========================
export async function animateRoulette(
  type
){

  const state =
    getState();

  const items =
    type === "cap"
      ? state.data.caps
      : state.data.swimsuits;

  if(!items.length){

    return;
  }

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
          getWeightedRandom(
            items,
            type
          );

        if(!selected){

          resolve();

          return;
        }

        // =========================
        // SELECT
        // =========================
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

        // =========================
        // RENDER
        // =========================
        renderRoulette();

        triggerShuffle(type);

        frame++;

        lastTime = time;
      }

      // =========================
      // NEXT FRAME
      // =========================
      if(
        frame <
        SPIN_TOTAL_FRAME
      ){

        requestAnimationFrame(
          loop
        );
      }
      else{

        // =========================
        // HISTORY SAVE
        // =========================
        pushHistory(
          type
        );

        saveState(
          getState()
        ).finally(()=>{

          resolve();
        });
      }
    }

    requestAnimationFrame(
      loop
    );
  });
}

// =========================
// WEIGHT RANDOM
// =========================
function getWeightedRandom(
  items,
  type
){

  const state =
    getState();

  const history =
    type === "cap"
      ? state.history?.caps || []
      : state.history?.swimsuits || [];

  // =========================
  // 최근 1회 제외
  // =========================
  const latestId =
    history[0];

  const weighted =
    items
      .map(item=>{

        // =========================
        // 방금 등장 제외
        // =========================
        if(
          item.id === latestId
        ){

          return null;
        }

        let weight = 1;

        // =========================
        // 최근 등장 가중치
        // =========================
        const historyIndex =
          history.indexOf(
            item.id
          );

        if(historyIndex === 1){

          weight = 0.3;
        }
        else if(historyIndex === 2){

          weight = 0.5;
        }
        else if(historyIndex === 3){

          weight = 0.7;
        }

        return {

          item,

          weight
        };
      })
      .filter(Boolean);

  if(!weighted.length){

    return items[
      Math.floor(
        Math.random() *
        items.length
      )
    ];
  }

  // =========================
  // TOTAL
  // =========================
  const totalWeight =

    weighted.reduce(

      (
        sum,
        current
      )=>

        sum +
        current.weight,

      0
    );

  let random =

    Math.random() *
    totalWeight;

  // =========================
  // PICK
  // =========================
  for(
    const current
    of weighted
  ){

    random -=
      current.weight;

    if(random <= 0){

      return current.item;
    }
  }

  return weighted[0].item;
}

// =========================
// HISTORY
// =========================
function pushHistory(type){

  const state =
    getState();

  const selectedId =

    type === "cap"
      ? state.selection.capId
      : state.selection.swimId;

  if(!selectedId){

    return;
  }

  const key =
    type === "cap"
      ? "caps"
      : "swimsuits";

  const currentHistory =
    state.history?.[key] || [];

  const nextHistory = [

    selectedId,

    ...currentHistory.filter(
      id=>id !== selectedId
    )
  ].slice(0,4);

  state.history[key] =
    nextHistory;
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
// WINNER FX
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

  for(
    let i = 0;
    i < 24;
    i++
  ){

    const confetti =
      document.createElement(
        "div"
      );

    confetti.className =
      "confetti";

    confetti.style.left =

      Math.random() * 100 +
      "%";

    confetti.style.animationDelay =

      Math.random() * 0.5 +
      "s";

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.remove();

    },3000);
  }
}
