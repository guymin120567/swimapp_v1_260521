import {
  getState
} from "../../state/state.js";

import {
  renderCoverflow
} from "../coverflow/renderCoverflow.js";

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

  <div class="roulette-wrap">

    <div class="roulette-slot">

      <div class="roulette-label">
        🧢 수모
      </div>

      <div class="roulette-card">

        ${
          cap?.image
          ? `
          <img
            src="${cap.image}"
            class="card-image"
          />
          `
          : `
          <div class="card-placeholder">
            🌊
          </div>
          `
        }

        <div class="card-overlay">

          <div class="roulette-name">
            ${cap?.name || "없음"}
          </div>

        </div>

      </div>

    </div>

    <div class="roulette-slot">

      <div class="roulette-label">
        🩲 수영복
      </div>

      <div class="roulette-card">

        ${
          swim?.image
          ? `
          <img
            src="${swim.image}"
            class="card-image"
          />
          `
          : `
          <div class="card-placeholder">
            🌊
          </div>
          `
        }

        <div class="card-overlay">

          <div class="roulette-name">
            ${swim?.name || "없음"}
          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="spin-row">

    <button
      id="spinButton"
      class="spin-btn"
    >
      오늘의 코디 뽑기
    </button>

  </div>

  <div class="coverflow-section">

    <div class="coverflow-title">
      🧢 수모
    </div>

    <div id="capCoverflow"></div>

  </div>

  <div class="coverflow-section">

    <div class="coverflow-title">
      🩲 수영복
    </div>

    <div id="swimCoverflow"></div>

  </div>

  `;

  renderCoverflow({
    type: "cap",
    targetId: "capCoverflow",
    items: state.data.caps
  });

  renderCoverflow({
    type: "swim",
    targetId: "swimCoverflow",
    items: state.data.swims
  });
}
