import {
  getState
} from "../../state/state.js";

import {
  setActiveCap,
  setActiveSwim
} from "../../state/actions.js";

// =========================
// RENDER
// =========================
export function renderCoverflow({

  type,
  targetId,
  items
}){

  const target =
    document.getElementById(
      targetId
    );

  if(!target) return;

  const state =
    getState();

  let activeId =
    type === "cap"
      ? state.ui.activeCapId
      : state.ui.activeSwimId;

  // =========================
  // DEFAULT
  // =========================
  if(
    !activeId &&
    items.length
  ){

    activeId =
      items[0].id;

    if(type === "cap"){

      setActiveCap(activeId);

    }else{

      setActiveSwim(activeId);
    }
  }

  // =========================
  // FIND INDEX
  // =========================
  const activeIndex =
    items.findIndex(
      item =>
        item.id === activeId
    );

  // =========================
  // EMPTY
  // =========================
  if(!items.length){

    target.innerHTML = `

    <div class="coverflow-empty">

      아이템 없음

    </div>

    `;

    return;
  }

  // =========================
  // HTML
  // =========================
  target.innerHTML = `

  <div class="coverflow-track">

    ${
      items.map((item,index)=>{

        const distance =
          index - activeIndex;

        return `

        <div
          class="
            cover-card
            ${
              distance === 0
                ? "active"
                : ""
            }
          "
          data-type="${type}"
          data-id="${item.id}"
          data-index="${index}"
          style="
            transform:
              translateX(${distance * 90}px)
              scale(${distance === 0 ? 1 : 0.8})
              rotateY(${distance * -15}deg);

            z-index:
              ${999 - Math.abs(distance)};

            opacity:
              ${
                Math.abs(distance) > 4
                  ? 0
                  : 1 - Math.abs(distance) * 0.15
              };
          "
        >

          ${
            item.image
            ? `
            <img
              src="${item.image}"
              class="coverflow-image"
              draggable="false"
            />
            `
            : `
            <div class="coverflow-placeholder">
              🌊
            </div>
            `
          }

        </div>

        `;
      }).join("")
    }

  </div>

  `;
}
