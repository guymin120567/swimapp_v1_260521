import {
  getState
} from "../state/state.js";

export function renderApp(){

  const app =
    document.getElementById(
      "app"
    );

  const state =
    getState();

  app.innerHTML = `

    <div class="container">

      <div class="block">

        <div class="section-title">
          🎰 룰렛
        </div>

        <div class="roulette-wrap">

          <div class="roulette-slot cap">

            <div class="roulette-label">
              🧢 수모
            </div>

            ${
              state.selectedCap
              ? renderRouletteCard(
                  state.selectedCap
                )
              : `
                <div class="empty-card">
                  수모 없음
                </div>
              `
            }

          </div>

          <div class="roulette-slot swim">

            <div class="roulette-label">
              🩲 수영복
            </div>

            ${
              state.selectedSwim
              ? renderRouletteCard(
                  state.selectedSwim
                )
              : `
                <div class="empty-card">
                  수영복 없음
                </div>
              `
            }

          </div>

        </div>

        <button
          class="spin-btn"
          onclick="window.app.spinAll()"
        >
          오늘 뭐 입지?
        </button>

      </div>

    </div>
  `;
}

function renderRouletteCard(item){

  return `
    <div class="roulette-card">

      <div class="roulette-image-wrap">

        ${
          item.image
          ? `
            <img
              src="${item.image}"
              class="card-image"
            />
          `
          : `
            <div class="card-placeholder">
              🌊
            </div>
          `
        }

        <div class="ripple"></div>

      </div>

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>
  `;
}
