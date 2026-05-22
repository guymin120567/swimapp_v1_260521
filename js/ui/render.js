import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

let initialized = false;

let renderScheduled = false;

// =========================
// MAIN RENDER
// =========================
export function renderApp(){

  if(renderScheduled) return;

  renderScheduled = true;

  requestAnimationFrame(()=>{

    renderScheduled = false;

    if(!initialized){

      renderLayout();

      initialized = true;
    }

    renderRoulette();

    renderLists();
  });
}

// =========================
// LAYOUT
// =========================
function renderLayout(){

  dom.app.innerHTML = `

  <div class="container">

    <div class="block">

      <div class="section-title">
        🎰 룰렛
      </div>

      <div id="rouletteArea"></div>

      <button
        class="spin-btn"
        data-action="spin"
      >
        오늘 뭐 입지?
      </button>

    </div>

    <div class="block">

      <div
        class="section-title"
        id="capTitle"
      ></div>

      <div
        class="coverflow"
        id="capList"
      ></div>

    </div>

    <div class="block">

      <div
        class="section-title"
        id="swimTitle"
      ></div>

      <div
        class="coverflow"
        id="swimList"
      ></div>

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

  dom.roulette =
    document.getElementById(
      "rouletteArea"
    );

  dom.capList =
    document.getElementById(
      "capList"
    );

  dom.swimList =
    document.getElementById(
      "swimList"
    );
}

// =========================
// ROULETTE
// =========================
export function renderRoulette(){

  const state = getState();

  dom.roulette.innerHTML = `

    <div class="roulette-wrap">

      <div class="roulette-slot cap">

        <div class="roulette-label">
          🧢 수모
        </div>

        ${
          renderRouletteCard(
            state.selectedCap
          )
        }

      </div>

      <div class="roulette-slot swim">

        <div class="roulette-label">
          🩲 수영복
        </div>

        ${
          renderRouletteCard(
            state.selectedSwim
          )
        }

      </div>

    </div>
  `;
}

// =========================
// LISTS
// =========================
export function renderLists(){

  const state = getState();

  document.getElementById(
    "capTitle"
  ).innerText =
    `🧢 수모 (${state.caps.length})`;

  document.getElementById(
    "swimTitle"
  ).innerText =
    `🩲 수영복 (${state.swimsuits.length})`;

  dom.capList.innerHTML =
    renderVisibleCards(
      state.caps,
      state.activeCapIndex,
      "cap"
    );

  dom.swimList.innerHTML =
    renderVisibleCards(
      state.swimsuits,
      state.activeSwimIndex,
      "swim"
    );
}

// =========================
// ROULETTE CARD
// =========================
function renderRouletteCard(item){

  if(!item){

    return `
      <div class="empty-card">
        없음
      </div>
    `;
  }

  return `
    <div class="roulette-card">

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

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>
  `;
}

// =========================
// VISIBLE CARDS
// =========================
function renderVisibleCards(
  items,
  activeIndex,
  type
){

  if(!items.length){

    return `
      <div class="empty-card">
        아이템 없음
      </div>
    `;
  }

  const start =
    Math.max(0,activeIndex - 2);

  const end =
    Math.min(
      items.length,
      activeIndex + 3
    );

  return items
    .slice(start,end)
    .map((item,i)=>{

      const realIndex =
        start + i;

      return renderCard(
        item,
        realIndex,
        activeIndex,
        type
      );
    })
    .join("");
}

// =========================
// CARD
// =========================
function renderCard(
  item,
  index,
  activeIndex,
  type
){

  const distance =
    Math.abs(index - activeIndex);

  const active =
    distance === 0;

  const scale =
    Math.max(0.72,1 - distance * 0.12);

  const opacity =
    Math.max(0.35,1 - distance * 0.18);

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      data-type="${type}"
      data-index="${index}"
      style="
        transform:
          scale(${scale})
          translateY(${distance * 10}px);

        opacity:${opacity};
        z-index:${100-distance};
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
