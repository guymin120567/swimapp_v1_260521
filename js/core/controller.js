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
  // ADD ITEM
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
  // SET ACTIVE
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

    await update();
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

    await update();
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

    await Promise.all([

      animateRoulette(
        "cap"
      ),

      animateRoulette(
        "swim"
      )
    ]);

    button.disabled = false;

    button.innerText =
      "오늘 뭐 입지?";
  }

  // =========================
  // ROULETTE EFFECT
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

    const loops =
      18 +
      Math.floor(
        Math.random() * 10
      );

    for(
      let i=0;
      i<loops;
      i++
    ){

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

      await sleep(
        50 + i * 12
      );
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
