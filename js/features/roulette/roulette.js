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
export async function spinAll() {

  const button =
    document.getElementById(
      "spinButton"
    );

  if (!button) return;

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
export async function animateRoulette(type) {

  const state =
    getState();

  const items =
    type === "cap"
      ? state.data.caps
      : state.data.swimsuits;

  if (!items.length) return;

  return new Promise(resolve => {

    let frame = 0;

    let lastTime = 0;

    function loop(time) {

      const delay =
        SPIN_BASE_DELAY +
        Math.pow(frame, 1.35) *
        SPIN_DELAY_STEP;

      if (
        time - lastTime >
        delay
      ) {

        const randomIndex =
          Math.floor(
            Math.random() *
            items.length
          );

        const selected =
          items[randomIndex];

        if (type === "cap") {

          setSelectedCap(
            selected.id
          );
        }
        else {

          setSelectedSwim(
            selected.id
          );
        }

        renderRoulette();

        triggerShuffle(type);

        frame++;

        lastTime = time;
      }

      if (
        frame <
        SPIN_TOTAL_FRAME
      ) {

        requestAnimationFrame(
          loop
        );
      }
      else {

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
// SHUFFLE FX
// =========================
function triggerShuffle(type) {

  const target =
    document.getElementById(
      type === "cap"
        ? "capResultName"
        : "swimResultName"
    );

  if (!target) return;

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
function triggerWinnerPulse() {

  const cap =
    document.getElementById(
      "capResultName"
    );

  const swim =
    document.getElementById(
      "swimResultName"
    );

  if (cap) {

    cap.classList.add(
      "winner-pulse"
    );

    setTimeout(() => {

      cap.classList.remove(
        "winner-pulse"
      );

    }, 900);
  }

  if (swim) {

    swim.classList.add(
      "winner-pulse"
    );

    setTimeout(() => {

      swim.classList.remove(
        "winner-pulse"
      );

    }, 900);
  }
}

// =========================
// CONFETTI
// =========================
function createConfetti() {

  for (
    let i = 0;
    i < 24;
    i++
  ) {

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

    setTimeout(() => {

      confetti.remove();

    }, 3000);
  }
}
