import {
  getState
} from "../state/state.js";

import {
  dom
} from "./dom.js";

export function renderLists(){

  const state =
    getState();

  document.getElementById(
    "capTitle"
  ).innerText =
    `🧢 수모 (${state.data.caps.length})`;

  document.getElementById(
    "swimTitle"
  ).innerText =
    `🩳 수영복 (${state.data.swimsuits.length})`;

  updateList(
    dom.capList,
    state.data.caps,
    state.ui.activeCapIndex,
    "cap"
  );

  updateList(
    dom.swimList,
    state.data.swimsuits,
    state.ui.activeSwimIndex,
    "swim"
  );

  requestAnimationFrame(()=>{

    centerActive(
      dom.capList,
      state.ui.activeCapIndex
    );

    centerActive(
      dom.swimList,
      state.ui.activeSwimIndex
    );
  });
}

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

        let scale = 1;

        if(distance === 1){

          scale = .88;
        }
        else if(distance >= 2){

          scale = .74;
        }

        let opacity = 1;

        if(distance === 1){

          opacity = .82;
        }
        else if(distance >= 2){

          opacity = .52;
        }

        let rotate = 0;

        if(rawDistance < 0){

          rotate = 16;
        }
        else if(rawDistance > 0){

          rotate = -16;
        }

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
                translate3d(${offset}px,0,0)
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
