import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

import {
  MAX_VISIBLE_CARDS,
  CARD_SCALE_STEP,
  CARD_OPACITY_STEP,
  CARD_MIN_SCALE,
  CARD_MIN_OPACITY
} from "../constants/ui.js";

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
// VISIBLE
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

  if(items.length <= MAX_VISIBLE_CARDS){

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
    Math.max(
      CARD_MIN_SCALE,
      1 - distance * CARD_SCALE_STEP
    );

  const opacity =
    Math.max(
      CARD_MIN_OPACITY,
      1 - distance * CARD_OPACITY_STEP
    );

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      data-type="${type}"
      data-index="${index}"
      style="
        transform:
          perspective(1000px)
          rotateY(${index < activeIndex ? 18 : -18}deg)
          translateY(${distance * 12}px)
          scale(${scale});

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
