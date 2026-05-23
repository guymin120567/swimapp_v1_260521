import {
  getState
} from "../../state/state.js";

import {
  setActiveCap,
  setActiveSwim,
  setSelectedCap,
  setSelectedSwim
} from "../../state/actions.js";

import {
  renderListsOnly,
  renderRouletteOnly
} from "../../ui/render.js";

import {
  saveState
} from "../../../db/database.js";

// =========================
// DRAG CAROUSEL
// =========================
export function bindDrag(){

  bindCarousel("cap");

  bindCarousel("swim");
}

// =========================
// BIND
// =========================
function bindCarousel(type){

  const targetId =
    type === "cap"
    ? "capList"
    : "swimList";

  let dragging = false;

  let startX = 0;

  let startScroll = 0;

  document.addEventListener(
    "pointerdown",
    e=>{

      const wrap =
        e.target.closest(
          `#${targetId}`
        );

      if(!wrap) return;

      dragging = true;

      startX =
        e.clientX;

      startScroll =
        wrap.scrollLeft;

      wrap.classList.add(
        "dragging"
      );
    },
    { passive:true }
  );

  document.addEventListener(
    "pointermove",
    e=>{

      if(!dragging) return;

      const wrap =
        document.getElementById(
          targetId
        );

      if(!wrap) return;

      const delta =
        e.clientX - startX;

      wrap.scrollLeft =
        startScroll - delta;
    },
    { passive:true }
  );

  document.addEventListener(
    "pointerup",
    async ()=>{

      if(!dragging) return;

      dragging = false;

      const wrap =
        document.getElementById(
          targetId
        );

      if(!wrap) return;

      wrap.classList.remove(
        "dragging"
      );

      await snapToClosest(
        wrap,
        type
      );
    }
  );
}

// =========================
// SNAP
// =========================
async function snapToClosest(
  wrap,
  type
){

  const state =
    getState();

  const items =
    type === "cap"
    ? state.data.caps
    : state.data.swimsuits;

  const cards =
    [
      ...wrap.querySelectorAll(
        ".cover-card"
      )
    ];

  if(!cards.length) return;

  const wrapCenter =
    wrap.scrollLeft +
    wrap.clientWidth / 2;

  let closestIndex = 0;

  let closestDistance =
    Infinity;

  cards.forEach(card=>{

    const cardCenter =
      card.offsetLeft +
      card.clientWidth / 2;

    const distance =
      Math.abs(
        wrapCenter - cardCenter
      );

    if(distance < closestDistance){

      closestDistance =
        distance;

      closestIndex =
        Number(
          card.dataset.index
        );
    }
  });

  const selected =
    items[closestIndex];

  if(type === "cap"){

    setActiveCap(
      closestIndex
    );

    setSelectedCap(
      selected?.id || null
    );
  }
  else{

    setActiveSwim(
      closestIndex
    );

    setSelectedSwim(
      selected?.id || null
    );
  }

  renderListsOnly();

  renderRouletteOnly();

  centerCard(
    wrap,
    closestIndex
  );

  await saveState(
    getState()
  );
}

// =========================
// CENTER
// =========================
function centerCard(
  wrap,
  index
){

  const target =
    wrap.querySelector(
      `.cover-card[data-index="${index}"]`
    );

  if(!target) return;

  const left =
    target.offsetLeft -
    (
      wrap.clientWidth / 2 -
      target.clientWidth / 2
    );

  wrap.scrollTo({

    left,

    behavior:"smooth"
  });
}
