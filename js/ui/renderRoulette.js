import {
  getState
} from "../state/state.js";

import {
  spinAll
} from "../features/roulette/roulette.js";

// =========================
// ROULETTE
// =========================
export function renderRoulette() {

  const target =
    document.getElementById(
      "rouletteSection"
    );

  if (!target) {

    console.error(
      "#rouletteSection NOT FOUND"
    );

    return;
  }

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

      <div class="glass-card">

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
// BIND
// =========================
function bindSpin() {

  const button =
    document.getElementById(
      "spinButton"
    );

  if (!button) return;

  button.onclick =
    async () => {

      await spinAll();
    };
}
