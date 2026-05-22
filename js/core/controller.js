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

          alert("spin 연결 예정");
        }

        if(action === "add"){

          await submitSelectedItem();
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

        if(
          Math.abs(diff) < 40
        ){
          return;
        }

      }
    );
  }

  return {
    boot
  };
}
