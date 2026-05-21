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

// =========================
// INIT
// =========================
export function initController(){

  async function boot(){

    bindGlobal();

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

    bindDrag();
  }

  // =========================
  // UPDATE
  // =========================
  async function update(){

    await saveState(
      getState()
    );

    renderApp();

    bindDrag();
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
        await fileToBase64(file);
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

    bindDrag();
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

    bindDrag();
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

      bindDrag();

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

    document
      .querySelectorAll(
        ".coverflow"
      )
      .forEach(flow=>{

        let startX = 0;

        flow.ontouchstart =
          e=>{

            startX =
              e.touches[0].clientX;
          };

        flow.ontouchend =
          e=>{

            const endX =
              e.changedTouches[0]
                .clientX;

            const diff =
              startX - endX;

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
          };
      });
  }

  // =========================
  // GLOBAL
  // =========================
  function bindGlobal(){

    window.app = {

      submitSelectedItem,

      removeItem,

      setActiveIndex,

      slide,

      spinAll
    };
  }

  return {
    boot
  };
}

// =========================
// UTIL
// =========================
function fileToBase64(file){

  return new Promise(resolve=>{

    const reader =
      new FileReader();

    reader.onload =
      ()=>resolve(
        reader.result
      );

    reader.readAsDataURL(file);
  });
}

function sleep(ms){

  return new Promise(
    resolve=>
      setTimeout(
        resolve,
        ms
      )
  );
}

function clamp(
  value,
  min,
  max
){

  return Math.min(
    Math.max(value,min),
    max
  );
}
