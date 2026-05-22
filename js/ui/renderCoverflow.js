import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

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

  requestAnimationFrame(()=>{

    centerActive(
      dom.capList,
      state.activeCapIndex
    );

    centerActive(
      dom.swimList,
      state.activeSwimIndex
    );
  });
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

  if(!items.length){

    target.innerHTML =
      `
      <div class="empty-card">
        아이템 없음
      </div>
      `;

    return;
  }

  target.innerHTML =
    items
      .map((item,index)=>{

        const distance =
          Math.abs(
            index - activeIndex
          );

        const active =
          index === activeIndex;

        const scale =
          active
          ? 1
          : Math.max(
              .82,
              1 - distance * .08
            );

        const opacity =
          active
          ? 1
          : Math.max(
              .55,
              1 - distance * .14
            );

        const rotate =
          active
          ? 0
          : index < activeIndex
            ? 10
            : -10;

        return `
          <div
            class="cover-card ${active ? "active" : ""}"
            data-type="${type}"
            data-index="${index}"

            style="
              transform:
                scale(${scale})
                rotateY(${rotate}deg);

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
      })
      .join("");
}

// =========================
// CENTER
// =========================
function centerActive(
  wrap,
  activeIndex
){

  const target =
    wrap.querySelector(
      `.cover-card[data-index="${activeIndex}"]`
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
