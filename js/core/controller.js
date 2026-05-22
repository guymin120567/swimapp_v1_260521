import {
  getState,
  setState,
  defaultState
} from "../state/state.js";

import {
  renderApp
} from "../ui/render.js";

import {
  saveState,
  loadState
} from "./db.js";

import {
  compressImage
} from "../utils/image.js";

// =========================
// INIT
// =========================
export function initController(){

  async function boot(){

    bindGlobal();
    bindDrag();

    const saved =
      await loadState();

    if(saved){

      setState(saved);
    }
    else{

      setState(
        structuredClone(
          defaultState
        )
      );
    }

    renderApp();
  }

  // =========================
  // UPDATE
  // =========================
  async function update({
    save = true
  } = {}){

    if(save){

      await saveState(
        getState()
      );
    }

    renderApp();
  }

  // =========================
  // ADD
  // =========================
  async function submitSelectedItem(){

    const type =
      document.getElementById(
        "itemType"
      ).value;

    const text =
      document.getElementById(
        "itemText"
      ).value.trim();

    const file =
      document.getElementById(
        "itemImage"
      ).files[0];

    if(!text){

      alert("이름 입력");

      return;
    }

    let image = null;

    if(file){

      image =
        await compressImage(file);
    }

    const state =
      getState();

    const item = {

      id: Date.now(),

      name: text,

      image
    };

    if(type === "cap"){

      state.caps.push(item);
    }
    else{

      state.swimsuits.push(item);
    }

    setState({
      ...state
    });

    document.getElementById(
      "itemText"
    ).value = "";

    document.getElementById(
      "itemImage"
    ).value = "";

    await update();
  }

  // =========================
  // REMOVE
  // =========================
  async function removeItem(
    type,
    id
  ){

    const ok = confirm(
      "정말 삭제할까요?"
    );

    if(!ok) return;

    const state =
      getState();

    if(type === "cap"){

      state.caps =
        state.caps.filter(
          item =>
            item.id != id
        );
    }
    else{

      state.swimsuits =
        state.swimsuits.filter(
          item =>
            item.id != id
        );
    }

    setState({
      ...state
    });

    await update();
  }

  // =========================
  // ACTIVE
  // =========================
  async function setActiveIndex(
    type,
    index
  ){

    const state =
      getState();

    if(type === "cap"){

      state.activeCapIndex =
        index;
    }
    else{

      state.activeSwimIndex =
        index;
    }

    setState({
      ...state
    });

    renderApp();
  }

  // =========================
  // SLIDE
  // =========================
  async function slide(
    type,
    direction
  ){

    const state =
      getState();

    const items =
      type === "cap"
      ? state.caps
      : state.swimsuits;

    if(!items.length){

      return;
    }

    if(type === "cap"){

      state.activeCapIndex +=
        direction;

      state.activeCapIndex =
        clamp(
          state.activeCapIndex,
          0,
          items.length - 1
        );
    }
    else{

      state.activeSwimIndex +=
        direction;

      state.activeSwimIndex =
        clamp(
          state.activeSwimIndex,
          0,
          items.length - 1
        );
    }

    setState({
      ...state
    });

    renderApp();
  }

  // =========================
  // SPIN
  // =========================
  async function spinAll(){

    const button =
      document.querySelector(
        ".spin-btn"
      );

    button.disabled = true;

    button.innerText =
      "돌리는 중...";

    document.body.classList.add(
      "roulette-active"
    );

    await Promise.all([

      animateRoulette(
        "cap"
      ),

      animateRoulette(
        "swim"
      )
    ]);

    document.body.classList.remove(
      "roulette-active"
    );

    button.disabled = false;

    button.innerText =
      "오늘 뭐 입지?";
  }

  // =========================
  // ROULETTE
  // =========================
  async function animateRoulette(
    type
  ){

    const state =
      getState();

    const items =
      type === "cap"
      ? state.caps
      : state.swimsuits;

    if(!items.length){

      return;
    }

    const totalDuration =
      2400 +
      Math.random() * 600;

    const start =
      performance.now();

    while(true){

      const now =
        performance.now();

      const elapsed =
        now - start;

      if(
        elapsed >= totalDuration
      ){
        break;
      }

      const progress =
        elapsed /
        totalDuration;

      const delay =
        40 +
        progress * 140;

      const random =
        Math.floor(
          Math.random() *
          items.length
        );

      const selected =
        items[random];

      if(type === "cap"){

        state.selectedCap =
          selected;
      }
      else{

        state.selectedSwim =
          selected;
      }

      setState({
        ...state
      });

      renderApp();

      await sleep(delay);
    }

    const finalIndex =
      Math.floor(
        Math.random() *
        items.length
      );

    const finalItem =
      items[finalIndex];

    if(type === "cap"){

      state.selectedCap =
        finalItem;
    }
    else{

      state.selectedSwim =
        finalItem;
    }

    setState({
      ...state
    });

    await update();

    triggerBurst(type);
  }

  // =========================
  // BURST
  // =========================
  function triggerBurst(type){

    const target =
      document.querySelector(
        `.roulette-slot.${type}`
      );

    if(!target){

      return;
    }

    target.classList.remove(
      "burst"
    );

    void target.offsetWidth;

    target.classList.add(
      "burst"
    );
  }

  // =========================
  // DRAG
  // =========================
  function bindDrag(){

    document.addEventListener(
      "pointerdown",
      e=>{

        const flow =
          e.target.closest(
            ".coverflow"
          );

        if(!flow) return;

        flow.dataset.startX =
          e.clientX;
      }
    );

    document.addEventListener(
      "pointerup",
      e=>{

        const flow =
          e.target.closest(
            ".coverflow"
          );

        if(!flow) return;

        const startX = Number(
          flow.dataset.startX || 0
        );

        const diff =
          startX - e.clientX;

        const type =
          flow.dataset.type;

        if(
          Math.abs(diff) < 40
        ){
          return;
        }

        if(diff > 0){

          slide(type,1);
        }
        else{

          slide(type,-1);
        }
      }
    );
  }

  // =========================
  // GLOBAL
  // =========================
  function bindGlobal(){

    const app =
      document.getElementById(
        "app"
      );

    app.addEventListener(
      "click",
      async e=>{

        const action =
          e.target.dataset.action;

        if(action === "spin"){

          await spinAll();
        }

        if(action === "add"){

          await submitSelectedItem();
        }

        const card =
          e.target.closest(
            ".cover-card"
          );

        if(card){

          await setActiveIndex(
            card.dataset.type,
            Number(card.dataset.index)
          );
        }

        const removeBtn =
          e.target.closest(
            ".delete-btn"
          );

        if(removeBtn){

          e.stopPropagation();

          await removeItem(
            removeBtn.dataset.type,
            Number(
              removeBtn.dataset.id
            )
          );
        }
      }
    );
  }

  return {
    boot
  };
}

// =========================
// UTIL
// =========================
function clamp(value,min,max){

  return Math.min(
    Math.max(value,min),
    max
  );
}

function sleep(ms){

  return new Promise(resolve=>{

    setTimeout(resolve,ms);
  });
}
```

---

# js/ui/render.js

```js
import { getState } from "../state/state.js";

let renderScheduled = false;

export function renderApp(){

  if(renderScheduled) return;

  renderScheduled = true;

  requestAnimationFrame(()=>{

    renderScheduled = false;

    const app =
      document.getElementById("app");

    const state =
      getState();

    app.innerHTML = `

    <div class="container">

      <div class="block">

        <div class="section-title">
          🎰 룰렛
        </div>

        <div class="roulette-wrap">

          <div class="roulette-slot cap">

            <div class="roulette-label">
              🧢 수모
            </div>

            ${
              state.selectedCap
              ? renderRouletteCard(state.selectedCap)
              : `
                <div class="empty-card">
                  수모 없음
                </div>
              `
            }

          </div>

          <div class="roulette-slot swim">

            <div class="roulette-label">
              🩲 수영복
            </div>

            ${
              state.selectedSwim
              ? renderRouletteCard(state.selectedSwim)
              : `
                <div class="empty-card">
                  수영복 없음
                </div>
              `
            }

          </div>

        </div>

        <button
          class="spin-btn"
          data-action="spin"
        >
          오늘 뭐 입지?
        </button>

      </div>

      <div class="block">

        <div class="section-title">
          🧢 수모 (${state.caps.length})
        </div>

        <div class="coverflow" data-type="cap">

          ${
            renderVisibleCards(
              state.caps,
              state.activeCapIndex,
              "cap"
            )
          }

        </div>

      </div>

      <div class="block">

        <div class="section-title">
          🩲 수영복 (${state.swimsuits.length})
        </div>

        <div class="coverflow" data-type="swim">

          ${
            renderVisibleCards(
              state.swimsuits,
              state.activeSwimIndex,
              "swim"
            )
          }

        </div>

      </div>

      <div class="block">

        <div class="section-title">
          ➕ 추가하기
        </div>

        <div class="input-area">

          <select id="itemType">
            <option value="cap">🧢 수모</option>
            <option value="swim">🩲 수영복</option>
          </select>

          <input
            id="itemText"
            type="text"
            placeholder="이름 입력"
          />

          <input
            id="itemImage"
            type="file"
            accept="image/*"
          />

          <button
            class="spin-btn"
            data-action="add"
          >
            추가
          </button>

        </div>

      </div>

    </div>

    `;
  });
}

function renderRouletteCard(item){

  return `
    <div class="roulette-card">

      <div class="roulette-image-wrap">

        ${
          item.image
          ? `
            <img src="${item.image}" class="card-image" />
          `
          : `
            <div class="card-placeholder">
              🌊
            </div>
          `
        }

        <div class="ripple"></div>

      </div>

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>
  `;
}

function renderVisibleCards(items,activeIndex,type){

  if(!items.length){

    return `
      <div class="empty-card">
        아이템 없음
      </div>
    `;
  }

  const start =
    Math.max(0,activeIndex - 2);

  const end =
    Math.min(items.length,activeIndex + 3);

  return items
    .slice(start,end)
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
    Math.max(0.72,1 - distance * 0.12);

  const opacity =
    Math.max(0.35,1 - distance * 0.18);

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      data-type="${type}"
      data-index="${index}"
      style="
        transform: scale(${scale}) translateY(${distance * 10}px);
        opacity: ${opacity};
        z-index: ${100 - distance};
      "
    >

      <div class="card-inner">

        ${
          item.image
          ? `
            <img src="${item.image}" class="card-image" />
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
```

---

# js/utils/image.js

```js
// =========================
// COMPRESS IMAGE
// =========================
export async function compressImage(file){

  return new Promise((resolve)=>{

    const reader =
      new FileReader();

    reader.onload = (event)=>{

      const img = new Image();

      img.onload = ()=>{

        const canvas =
          document.createElement(
            "canvas"
          );

        const MAX_SIZE = 600;

        let width = img.width;
        let height = img.height;

        if(width > height){

          if(width > MAX_SIZE){

            height *=
              MAX_SIZE / width;

            width = MAX_SIZE;
          }
        }
        else{

          if(height > MAX_SIZE){

            width *=
              MAX_SIZE / height;

            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const result =
          canvas.toDataURL(
            "image/webp",
            0.72
          );

        resolve(result);
      };

      img.src =
        event.target.result;
    };

    reader.readAsDataURL(file);
  });
}
```
