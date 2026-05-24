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

  if(
    !dom.capList ||
    !dom.swimList
  ){
    return;
  }

  const state =
    getState();

  // =========================
  // TITLE
  // =========================

  if(dom.capTitle){

    dom.capTitle.innerText =
      `🧢 수모 (${state.data.caps.length})`;
  }

  if(dom.swimTitle){

    dom.swimTitle.innerText =
      `🩲 수영복 (${state.data.swimsuits.length})`;
  }

  // =========================
  // LIST
  // =========================

  updateList(
    dom.capList,
    state.data.caps,
    state.ui?.activeCapIndex || 0,
    "cap"
  );

  updateList(
    dom.swimList,
    state.data.swimsuits,
    state.ui?.activeSwimIndex || 0,
    "swim"
  );

  requestAnimationFrame(()=>{

    centerActive(
      dom.capList,
      state.ui?.activeCapIndex || 0
    );

    centerActive(
      dom.swimList,
      state.ui?.activeSwimIndex || 0
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

        let scale = 1;

        if(distance === 1){

          scale = .86;
        }
        else if(distance === 2){

          scale = .72;
        }
        else if(distance >= 3){

          scale = .58;
        }

        let opacity = 1;

        if(distance === 1){

          opacity = .82;
        }
        else if(distance === 2){

          opacity = .55;
        }
        else if(distance >= 3){

          opacity = .28;
        }

        let rotate = 0;

        if(rawDistance < 0){

          rotate = 22;
        }
        else if(rawDistance > 0){

          rotate = -22;
        }

        let offset = 0;

        if(rawDistance < 0){

          offset = distance * 26;
        }
        else if(rawDistance > 0){

          offset = distance * -26;
        }

        return `
          <div
            class="
              cover-card
              ${active ? "active" : ""}
            "

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

// =========================
// CENTER
// =========================
function centerActive(
  wrap,
  activeIndex
){

  if(!wrap) return;

  const activeCard =
    wrap.querySelectorAll(
      ".cover-card"
    )[activeIndex];

  if(!activeCard) return;

  const left =
    activeCard.offsetLeft -
    wrap.clientWidth / 2 +
    activeCard.clientWidth / 2;

  wrap.scrollTo({

    left,

    behavior:"smooth"
  });
}
