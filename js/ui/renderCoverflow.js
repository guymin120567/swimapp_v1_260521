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

  const state =
    getState();

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

  autoCenterActive();
}

// =========================
// UPDATE
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

  const total =
    items.length;

  const visible = [];

  for(let i=-2;i<=2;i++){

    let index =
      activeIndex + i;

    if(index < 0){

      index =
        total + index;
    }

    if(index >= total){

      index =
        index - total;
    }

    visible.push({

      item:items[index],

      realIndex:index,

      distance:i
    });
  }

  return visible
    .map(data=>{

      return renderCard(
        data.item,
        data.realIndex,
        activeIndex,
        type,
        data.distance
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
  type,
  distance
){

  const abs =
    Math.abs(distance);

  const active =
    distance === 0;

  const scale =
    Math.max(
      CARD_MIN_SCALE,
      1 - abs * CARD_SCALE_STEP
    );

  const opacity =
    Math.max(
      CARD_MIN_OPACITY,
      1 - abs * CARD_OPACITY_STEP
    );

  const rotate =
    distance * -16;

  const offset =
    distance * -34;

  const brightness =
    1 - abs * .12;

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      data-type="${type}"
      data-index="${index}"

      style="
        transform:
          translateX(${offset}px)
          rotateY(${rotate}deg)
          scale(${scale});

        opacity:${opacity};

        filter:
          brightness(${brightness});

        z-index:${100-abs};
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

// =========================
// CENTER
// =========================
function autoCenterActive(){

  requestAnimationFrame(()=>{

    document
      .querySelectorAll(
        ".cover-card.active"
      )
      .forEach(card=>{

        card.scrollIntoView({

          behavior:"smooth",

          inline:"center",

          block:"nearest"
        });
      });
  });
}
