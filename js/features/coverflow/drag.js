import {
  renderListsOnly
} from "../../ui/render.js";

// =========================
// DRAG
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

  const wrap =
    document.getElementById(
      targetId
    );

  if(!wrap) return;

  // =========================
  // 중복 방지
  // =========================
  if(wrap.dataset.dragBound){
    return;
  }

  wrap.dataset.dragBound = "true";

  let dragging = false;

  let startX = 0;

  let startScroll = 0;

  // =========================
  // POINTER DOWN
  // =========================
  wrap.addEventListener(
    "pointerdown",
    e=>{

      dragging = true;

      startX =
        e.clientX;

      startScroll =
        wrap.scrollLeft;

      wrap.classList.add(
        "dragging"
      );
    }
  );

  // =========================
  // POINTER MOVE
  // =========================
  wrap.addEventListener(
    "pointermove",
    e=>{

      if(!dragging) return;

      const delta =
        e.clientX - startX;

      wrap.scrollLeft =
        startScroll - delta;
    }
  );

  // =========================
  // POINTER UP
  // =========================
  window.addEventListener(
    "pointerup",
    ()=>{

      if(!dragging) return;

      dragging = false;

      wrap.classList.remove(
        "dragging"
      );

      snapToClosest(
        wrap
      );
    }
  );

  // =========================
  // TOUCH START
  // =========================
  wrap.addEventListener(
    "touchstart",
    e=>{

      startX =
        e.touches[0].clientX;

      startScroll =
        wrap.scrollLeft;
    },
    { passive:true }
  );

  // =========================
  // TOUCH MOVE
  // =========================
  wrap.addEventListener(
    "touchmove",
    e=>{

      const delta =
        e.touches[0].clientX -
        startX;

      wrap.scrollLeft =
        startScroll - delta;
    },
    { passive:true }
  );
}

// =========================
// SNAP
// =========================
function snapToClosest(
  wrap
){

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

  let closestCard = null;

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

      closestCard =
        card;
    }
  });

  if(!closestCard) return;

  centerCard(
    wrap,
    closestCard
  );

  // =========================
  // active 연출만 갱신
  // =========================
  requestAnimationFrame(()=>{

    renderListsOnly();
  });
}

// =========================
// CENTER
// =========================
function centerCard(
  wrap,
  target
){

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
