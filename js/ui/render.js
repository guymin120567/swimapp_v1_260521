import {
  getState
} from "../state/state.js";

let renderScheduled = false;

export function renderApp(){

  if(renderScheduled) return;

  renderScheduled = true;

  requestAnimationFrame(()=>{

    renderScheduled = false;

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

        <button
          class="spin-btn"
          data-action="spin"
        >
          오늘 뭐 입지?
        </button>

      </div>

      <div class="block">

        <div class="section-title">
          🧢 수모 (${state.caps.length})
        </div>

        <div class="coverflow">

          ${
            renderVisibleCards(
              state.caps,
              "cap"
            )
          }

        </div>

      </div>

      <div class="block">

        <div class="section-title">
          🩲 수영복 (${state.swimsuits.length})
        </div>

        <div class="coverflow">

          ${
            renderVisibleCards(
              state.swimsuits,
              "swim"
            )
          }

        </div>

      </div>

      <div class="block">

        <div class="section-title">
          ➕ 추가하기
        </div>

        <div class="input-area">

          <select id="itemType">
            <option value="cap">🧢 수모</option>
            <option value="swim">🩲 수영복</option>
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
            data-action="add"
          >
            추가
          </button>

        </div>

      </div>

    </div>

    `;
  });
}

function renderVisibleCards(
  items,
  type
){

  if(!items.length){

    return `
      <div class="empty-card">
        아이템 없음
      </div>
    `;
  }

  return items
    .map((item,index)=>{

      return renderCard(
        item,
        index,
        type
      );
    })
    .join("");
}

function renderCard(
  item,
  index,
  type
){

  return `
    <div
      class="cover-card"
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
            data-type="${type}"
            data-id="${item.id}"
          >
            ×
          </button>

        </div>

      </div>

    </div>
  `;
}
