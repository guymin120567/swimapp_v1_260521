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

  triggerWinnerPulse();

  createConfetti();

  button.disabled = false;

  button.innerText =
    "오늘 뭐 입지?";
}

// =========================
// ROULETTE
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
            selected
          );
        }
        else{

          setSelectedSwim(
            selected
          );
        }

        renderRoulette();

        triggerShuffle(type);

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

// =========================
// SHUFFLE
// =========================
function triggerShuffle(type){

  const target =
    document.querySelector(
      type === "cap"
      ? ".roulette-slot:first-child .roulette-card"
      : ".roulette-slot:last-child .roulette-card"
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

  const cards =
    document.querySelectorAll(
      ".roulette-card"
    );

  cards.forEach(card=>{

    card.classList.remove(
      "winner"
    );

    void card.offsetWidth;

    card.classList.add(
      "winner"
    );
  });
}

// =========================
// CONFETTI
// =========================
function createConfetti(){

  for(let i=0;i<28;i++){

    const confetti =
      document.createElement(
        "div"
      );

    confetti.className =
      "confetti";

    confetti.style.left =
      Math.random() * 100 + "%";

    confetti.style.animationDelay =
      Math.random() * .4 + "s";

    confetti.style.transform =
      `rotate(${Math.random()*360}deg)`;

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.remove();

    },2200);
  }
}
