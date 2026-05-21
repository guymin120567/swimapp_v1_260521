import {
  getState
} from "../state/state.js";

// =========================
// RENDER
// =========================
export function renderApp(){

  const app =
    document.getElementById(
      "app"
    );

  const state =
    getState();

  app.innerHTML = `

    <div class="container">

      <!-- =========================
           ROULETTE
      ========================== -->

      <div class="block">

        <div class="section-title">
          🎰 룰렛
        </div>

        <div class="roulette-wrap">

          <div class="roulette-slot">

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

          <div class="roulette-slot">

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

      <!-- =========================
           CAP
      ========================== -->

      <div class="block">

        <div class="section-title">
          🧢 수모 (${state.caps.length})
        </div>

        <div class="coverflow">

          ${
            state.caps.length
            ? state.caps.map(
                (item,index)=>
                  renderCoverflowCard(
                    item,
                    index,
                    state.activeCapIndex,
                    "cap"
                  )
              ).join("")
            : `
              <div class="empty-card">
                수모 추가해줘
              </div>
            `
          }

        </div>

      </div>

      <!-- =========================
           SWIM
      ========================== -->

      <div class="block">

        <div class="section-title">
          🩲 수영복 (${state.swimsuits.length})
        </div>

        <div class="coverflow">

          ${
            state.swimsuits.length
            ? state.swimsuits.map(
                (item,index)=>
                  renderCoverflowCard(
                    item,
                    index,
                    state.activeSwimIndex,
                    "swim"
                  )
              ).join("")
            : `
              <div class="empty-card">
                수영복 추가해줘
              </div>
            `
          }

        </div>

      </div>

      <!-- =========================
           INPUT
      ========================== -->

      <div class="block">

        <div class="section-title">
          ➕ 추가하기
        </div>

        <div class="input-area">

          <select id="itemType">

            <option value="cap">
              🧢 수모
            </option>

            <option value="swim">
              🩲 수영복
            </option>

          </select>

          <input
            id="itemText"
            type="text"
            placeholder="이름 입력"
          />

          <input
            id="itemImage"
            type="file"
            accept="image/*"
          />

          <button
            class="spin-btn"
            onclick="window.app.submitSelectedItem()"
          >
            추가
          </button>

        </div>

      </div>

    </div>
  `;
}

// =========================
// ROULETTE CARD
// =========================
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

      </div>

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>
  `;
}

// =========================
// COVERFLOW CARD
// =========================
function renderCoverflowCard(
  item,
  index,
  activeIndex,
  type
){

  const distance =
    Math.abs(
      index - activeIndex
    );

  const scale =
    Math.max(
      0.72,
      1 - distance * 0.12
    );

  const opacity =
    Math.max(
      0.35,
      1 - distance * 0.2
    );

  const translateY =
    distance * 12;

  const zIndex =
    100 - distance;

  return `
    <div
      class="cover-card"
      onclick="
        window.app.setActiveIndex(
          '${type}',
          ${index}
        )
      "
      style="
        transform:
          scale(${scale})
          translateY(${translateY}px);

        opacity:${opacity};

        z-index:${zIndex};
      "
    >

      <div class="card-inner">

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

        <div class="card-overlay">

          <div class="card-title">
            ${item.name}
          </div>

          <button
            class="delete-btn"
            onclick="
              event.stopPropagation();

              window.app.removeItem(
                '${type}',
                '${item.id}'
              )
            "
          >
            ×
          </button>

        </div>

      </div>

    </div>
  `;
}
