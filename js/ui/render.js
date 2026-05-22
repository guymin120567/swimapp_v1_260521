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

      <div class="roulette-wrap">

        <div class="roulette-slot">

          <div class="roulette-label">
            🧢 수모
          </div>

          <div class="roulette-card">

            <img
              id="capResultImage"
              class="card-image"
            />

            <div
              id="capResultPlaceholder"
              class="card-placeholder"
            >
              🌊
            </div>

            <div
              id="capResultName"
              class="roulette-name"
            >
              없음
            </div>

          </div>

        </div>

        <div class="roulette-slot">

          <div class="roulette-label">
            🩲 수영복
          </div>

          <div class="roulette-card">

            <img
              id="swimResultImage"
              class="card-image"
            />

            <div
              id="swimResultPlaceholder"
              class="card-placeholder"
            >
              🌊
            </div>

            <div
              id="swimResultName"
              class="roulette-name"
            >
              없음
            </div>

          </div>

        </div>

      </div>

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

  dom.capList =
    document.getElementById(
      "capList"
    );

  dom.swimList =
    document.getElementById(
      "swimList"
    );

  dom.capResultImage =
    document.getElementById(
      "capResultImage"
    );

  dom.capResultName =
    document.getElementById(
      "capResultName"
    );

  dom.swimResultImage =
    document.getElementById(
      "swimResultImage"
    );

  dom.swimResultName =
    document.getElementById(
      "swimResultName"
    );
}

// =========================
// ROULETTE
// =========================
export function renderRoulette(){

  const state = getState();

  updateRouletteCard(
    "cap",
    state.selectedCap
  );

  updateRouletteCard(
    "swim",
    state.selectedSwim
  );
}

function updateRouletteCard(
  type,
  item
){

  const image =
    type === "cap"
    ? dom.capResultImage
    : dom.swimResultImage;

  const name =
    type === "cap"
    ? dom.capResultName
    : dom.swimResultName;

  const placeholder =
    document.getElementById(
      type === "cap"
      ? "capResultPlaceholder"
      : "swimResultPlaceholder"
    );

  if(!item){

    image.style.display =
      "none";

    placeholder.style.display =
      "flex";

    name.innerText =
      "없음";

    return;
  }

  name.innerText =
    item.name;

  if(item.image){

    image.src =
      item.image;

    image.style.display =
      "block";

    placeholder.style.display =
      "none";
  }
  else{

    image.style.display =
      "none";

    placeholder.style.display =
      "flex";
  }
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

  updateList(
    dom.capList,
    state.caps,
    state.activeCapIndex,
    "cap"
  );

  updateList(
    dom.swimList,
    state.swimsuits,
    state.activeSwimIndex,
    "swim"
  );
}

// =========================
// UPDATE LIST
// =========================
function updateList(
  target,
  items,
  activeIndex,
  type
){

  target.innerHTML =
    renderVisibleCards(
      items,
      activeIndex,
      type
    );
}

// =========================
// ALWAYS SHOW 5
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

  if(items.length <= 5){

    return items
      .map((item,index)=>{

        return renderCard(
          item,
          index,
          activeIndex,
          type
        );
      })
      .join("");
  }

  let start =
    activeIndex - 2;

  let end =
    activeIndex + 2;

  if(start < 0){

    end += Math.abs(start);

    start = 0;
  }

  if(end >= items.length){

    const diff =
      end - items.length + 1;

    start -= diff;

    end =
      items.length - 1;
  }

  start =
    Math.max(0,start);

  return items
    .slice(start,end + 1)
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
              loading="lazy"
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
