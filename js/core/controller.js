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

  // =========================
  // BOOT
  // =========================
  async function boot(){

    console.log(
      "APP BOOT START"
    );

    bindGlobal();

    renderApp();

    console.log(
      "APP BOOT SUCCESS"
    );
  }

  // =========================
  // ADD ITEM
  // =========================
  async function submitSelectedItem(){

    const typeInput =
      document.getElementById(
        "itemType"
      );

    const textInput =
      document.getElementById(
        "itemText"
      );

    const fileInput =
      document.getElementById(
        "itemImage"
      );

    const type =
      typeInput.value;

    const text =
      textInput.value.trim();

    if(!text){

      alert("이름 입력");

      return;
    }

    const file =
      fileInput.files[0];

    let image = null;

    // =========================
    // IMAGE
    // =========================
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

    // =========================
    // PUSH
    // =========================
    if(type === "cap"){

      state.caps.push(item);
    }
    else{

      state.swimsuits.push(item);
    }

    // =========================
    // SAVE STATE
    // =========================
    setState({
      ...state
    });

    // =========================
    // RESET
    // =========================
    textInput.value = "";

    fileInput.value = "";

    // =========================
    // RERENDER
    // =========================
    renderApp();

    console.log(
      "ITEM ADDED",
      item
    );
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

    renderApp();
  }

  // =========================
  // ROULETTE
  // =========================
  function spinAll(){

    const state =
      getState();

    // 랜덤 수모
    if(state.caps.length){

      state.selectedCap =
        state.caps[
          Math.floor(
            Math.random() *
            state.caps.length
          )
        ];
    }

    // 랜덤 수영복
    if(state.swimsuits.length){

      state.selectedSwim =
        state.swimsuits[
          Math.floor(
            Math.random() *
            state.swimsuits.length
          )
        ];
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

      spinAll
    };
  }

  return {
    boot
  };
}

// =========================
// FILE → BASE64
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
