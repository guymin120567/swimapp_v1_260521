import {
  getState,
  setState
} from "../state/state.js";

import {
  renderApp
} from "../ui/render.js";

// =========================
// INIT
// =========================
export function initController(){

  async function boot(){

    bindGlobal();

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

    renderApp();
  }

  // =========================
  // REMOVE
  // =========================
  function removeItem(
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

    renderApp();
  }

  // =========================
  // ACTIVE CARD
  // =========================
  function setActiveIndex(
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
  // SPIN
  // =========================
  function spinAll(){

    const state =
      getState();

    if(state.caps.length){

      const randomIndex =
        Math.floor(
          Math.random() *
          state.caps.length
        );

      state.activeCapIndex =
        randomIndex;

      state.selectedCap =
        state.caps[randomIndex];
    }

    if(state.swimsuits.length){

      const randomIndex =
        Math.floor(
          Math.random() *
          state.swimsuits.length
        );

      state.activeSwimIndex =
        randomIndex;

      state.selectedSwim =
        state.swimsuits[randomIndex];
    }

    setState({
      ...state
    });

    renderApp();
  }

  // =========================
  // GLOBAL
  // =========================
  function bindGlobal(){

    window.app = {

      submitSelectedItem,

      removeItem,

      spinAll,

      setActiveIndex
    };
  }

  return {
    boot
  };
}

// =========================
// FILE
// =========================
function fileToBase64(file){

  return new Promise(resolve=>{

    const reader =
      new FileReader();

    reader.onload = ()=>{

      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });
}
