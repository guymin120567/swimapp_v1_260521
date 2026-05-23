import {
  getState
} from "../state/state.js";

// =========================
// ROULETTE
// =========================
export function renderRoulette(){

  const target =
    document.getElementById(
      "rouletteSection"
    );

  if(!target) return;

  const state =
    getState();

  const cap =
    state.selection.cap;

  const swim =
    state.selection.swim;

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
              id="rouletteCap"
              class="roulette-value"
            >
              ${
                cap?.name ||
                "선택 없음"
              }
            </div>

          </div>

          <div class="roulette-divider"></div>

          <div class="roulette-item">

            <div class="roulette-label">
              🩳 수영복
            </div>

            <div
              id="rouletteSwim"
              class="roulette-value"
            >
              ${
                swim?.name ||
                "선택 없음"
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
}
