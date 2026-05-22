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
    `🩳 수영복 (${state.swimsuits.length})`;

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

        const rawDistance =
          index - activeIndex;

        const distance =
          Math.abs(rawDistance);

        const active =
          index === activeIndex;

        // =========================
        // SCALE
        // =========================
        let scale = 1;

        if(distance === 1){

          scale = .88;
        }
        else if(distance >= 2){

          scale = .74;
        }

        // =========================
        // OPACITY
        // =========================
        let opacity = 1;

        if(distance === 1){

          opacity = .82;
        }
        else if(distance >= 2){

          opacity = .52;
        }

        // =========================
        // ROTATE
        // =========================
        let rotate = 0;

        if(rawDistance < 0){

          rotate = 16;
        }
        else if(rawDistance > 0){

          rotate = -16;
        }

        // =========================
        // OFFSET
        // =========================
        let offset = 0;

        if(rawDistance < 0){

          offset = distance * 18;
        }
        else if(rawDistance > 0){

          offset = distance * -18;
        }

        return `
          <div
            class="cover-card ${active ? "active" : ""}"
            data-type="${type}"
            data-index="${index}"

            style="
              transform:
                translateX(${offset}px)
                scale(${scale})
                rotateY(${rotate}deg);

              opacity:${opacity};

              z-index:${100-distance};

              filter:
                brightness(${1 - distance * .08});
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
