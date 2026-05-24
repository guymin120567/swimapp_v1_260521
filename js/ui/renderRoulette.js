import { getState } from "../state/state.js";

import {
  setSelectedCap,
  setSelectedSwim
} from "../state/actions.js";

// =========================
// ROULETTE
// =========================
export function renderRoulette() {

  const target =
    document.getElementById(
      "rouletteSection"
    );

  if (!target) return;

  const state =
    getState();

  const selectedCap =
    state.data.caps.find(
      item =>
        item.id ===
        state.selection.capId
    );

  const selectedSwim =
    state.data.swimsuits.find(
      item =>
        item.id ===
        state.selection.swimId
    );

  target.innerHTML = `
    <div class="roulette-bg"></div>

    <div class="roulette-overlay"></div>

    <div class="roulette-content">

      <div class="roulette-title">
        🎰 오늘 뭐 입지?
      </div>

      <div class="roulette-card glass-card">

        <div class="roulette-result">

          <div class="roulette-item">

            <div class="roulette-label">
              🧢 수모
            </div>

            <div
              id="capValue"
              class="roulette-value"
            >
              ${
                selectedCap?.name ??
                "아직 선택 안됨"
              }
            </div>

          </div>

          <div class="roulette-divider"></div>

          <div class="roulette-item">

            <div class="roulette-label">
              🩳 수영복
            </div>

            <div
              id="swimValue"
              class="roulette-value"
            >
              ${
                selectedSwim?.name ??
                "아직 선택 안됨"
              }
            </div>

          </div>

        </div>

        <button
          id="spinButton"
          class="spin-button"
        >
          🎲 돌리기
        </button>

      </div>

    </div>
  `;

  bindSpin();
}

// =========================
// UPDATE VALUES
// =========================
export function updateRouletteValues() {

  const state =
    getState();

  const selectedCap =
    state.data.caps.find(
      item =>
        item.id ===
        state.selection.capId
    );

  const selectedSwim =
    state.data.swimsuits.find(
      item =>
        item.id ===
        state.selection.swimId
    );

  const capEl =
    document.getElementById(
      "capValue"
    );

  const swimEl =
    document.getElementById(
      "swimValue"
    );

  if (capEl) {

    capEl.textContent =
      selectedCap?.name ??
      "아직 선택 안됨";
  }

  if (swimEl) {

    swimEl.textContent =
      selectedSwim?.name ??
      "아직 선택 안됨";
  }
}

// =========================
// SPIN BUTTON
// =========================
function bindSpin() {

  const btn =
    document.getElementById(
      "spinButton"
    );

  if (!btn) return;

  btn.onclick = () => {

    const state =
      getState();

    const caps =
      state.data.caps;

    const swims =
      state.data.swimsuits;

    if (
      !caps.length ||
      !swims.length
    ) {

      console.warn(
        "DATA EMPTY"
      );

      return;
    }

    let randomCap =
      caps[
        Math.floor(
          Math.random() *
          caps.length
        )
      ];

    let randomSwim =
      swims[
        Math.floor(
          Math.random() *
          swims.length
        )
      ];

    // 연속 중복 방지
    if (
      caps.length > 1 &&
      randomCap.id ===
      state.selection.capId
    ) {

      randomCap =
        caps.find(
          item =>
            item.id !==
            state.selection.capId
        );
    }

    if (
      swims.length > 1 &&
      randomSwim.id ===
      state.selection.swimId
    ) {

      randomSwim =
        swims.find(
          item =>
            item.id !==
            state.selection.swimId
        );
    }

    setSelectedCap(
      randomCap.id
    );

    setSelectedSwim(
      randomSwim.id
    );

    updateRouletteValues();
  };
}
