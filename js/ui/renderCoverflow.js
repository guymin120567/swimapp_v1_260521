import {
  getState,
  setActiveCap,
  setActiveSwim
} from "../../state/state.js";

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

  const activeIndex =
    items.findIndex(
      (item)=>
        item.id === activeId
    );

  target.innerHTML = `

  <div class="coverflow-track">

    ${
      items.map((item,index)=>{

        const distance =
          index - activeIndex;

        return `

        <div
          class="
            coverflow-card
            ${
              distance === 0
                ? "active"
                : ""
            }
          "
          data-id="${item.id}"
          style="
            transform:
              translateX(${distance * 90}px)
              scale(${distance === 0 ? 1 : 0.8})
              rotateY(${distance * -15}deg);

            z-index:${999 - Math.abs(distance)};

            opacity:${
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

  target
    .querySelectorAll(
      ".coverflow-card"
    )
    .forEach((card)=>{

      card.addEventListener(
        "click",
        ()=>{

          const id =
            card.dataset.id;

          if(type === "cap"){

            setActiveCap(id);

          }else{

            setActiveSwim(id);
          }

          renderCoverflow({
            type,
            targetId,
            items
          });
        }
      );
    });
}
