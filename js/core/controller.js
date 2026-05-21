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
  }

  // =========================
  // SAVE + RENDER
  // =========================
  async function update(){

    await saveState(
      getState()
    );

    renderApp();
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

      state.activeCapIndex =
        state.caps.length - 1;
    }
    else{

      state.swimsuits.push(item);

      state.activeSwimIndex =
        state.swimsuits.length - 1;
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

      if(
        state.activeCapIndex >=
        state.caps.length
      ){

        state.activeCapIndex =
          Math.max(
            0,
            state.caps.length - 1
          );
      }
    }
    else{

      state.swimsuits =
        state.swimsuits.filter(
          item =>
            item.id != id
        );

      if(
        state.activeSwimIndex >=
        state.swimsuits.length
      ){

        state.activeSwimIndex =
          Math.max(
            0,
            state.swimsuits.length - 1
          );
      }
    }

    setState({
      ...state
    });

    await update();
  }

  // =========================
  // ACTIVE INDEX
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
  // NEXT / PREV
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

      if(
        state.activeCapIndex < 0
      ){
        state.activeCapIndex =
          0;
      }

      if(
        state.activeCapIndex >
        items.length - 1
      ){
        state.activeCapIndex =
          items.length - 1;
      }
    }
    else{

      state.activeSwimIndex +=
        direction;

      if(
        state.activeSwimIndex < 0
      ){
        state.activeSwimIndex =
          0;
      }

      if(
        state.activeSwimIndex >
        items.length - 1
      ){
        state.activeSwimIndex =
          items.length - 1;
      }
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

    const state =
      getState();

    if(state.caps.length){

      const random =
        Math.floor(
          Math.random() *
          state.caps.length
        );

      state.activeCapIndex =
        random;

      state.selectedCap =
        state.caps[random];
    }

    if(state.swimsuits.length){

      const random =
        Math.floor(
          Math.random() *
          state.swimsuits.length
        );

      state.activeSwimIndex =
        random;

      state.selectedSwim =
        state.swimsuits[random];
    }

    setState({
      ...state
    });

    await update();
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
// FILE -> BASE64
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
