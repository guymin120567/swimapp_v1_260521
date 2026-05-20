import {
  renderApp
} from "../ui/render.js";

import {
  renderPreview
} from "../ui/preview.js";

import {
  renderSwimList,
  renderCapList,
  initScrollSnap
} from "../ui/cards.js";

import {
  triggerHighlight
} from "../ui/effects.js";

import {
  renderInputSection
} from "../ui/input.js";

import {
  loadDB,
  saveDB
} from "../../db/database.js";

import {
  defaultState,
  getState,
  setInternalState
} from "../state/state.js";

import {
  fileToBase64
} from "../utils/image.js";

import {
  startRoulette
} from "./roulette.js";

/* =========================
   CONTROLLER
========================= */

export function initController() {

  async function boot() {

    const saved = await loadDB();

    const mergedState = {
      ...structuredClone(defaultState),
      ...(saved || {})
    };

    setInternalState(mergedState);

    renderApp(getState());

    bindGlobal();

    console.log("APP BOOT SUCCESS");

    // ⭐ 스냅 초기화 (DOM 이후)
    initScrollSnap();
  }

  async function updateState(patch) {

    const next = {
      ...getState(),
      ...patch
    };

    setInternalState(next);

    await saveDB(next);

    renderPreview(next);
    renderSwimList(next);
    renderCapList(next);

    initScrollSnap();
  }

  async function addByCategory(type, text, img) {

    const state = getState();

    const item = {
      id: Date.now(),
      text,
      img
    };

    if (type === "swimsuit") {
      await updateState({
        swimsuits: [...state.swimsuits, item]
      });
    }

    if (type === "cap") {
      await updateState({
        caps: [...state.caps, item]
      });
    }
  }

  async function removeItem(type, id) {

    const state = getState();

    if (type === "swimsuit") {
      await updateState({
        swimsuits: state.swimsuits.filter(i => i.id !== id)
      });
    }

    if (type === "cap") {
      await updateState({
        caps: state.caps.filter(i => i.id !== id)
      });
    }
  }

  async function addItemFromUI(type) {

    const textInput = document.getElementById("itemText");
    const fileInput = document.getElementById("itemImage");

    const text = textInput?.value?.trim();
    if (!text) return;

    const file = fileInput?.files?.[0];

    let img = null;

    if (file) {
      img = await fileToBase64(file);
    }

    await addByCategory(type, text, img);

    textInput.value = "";
    fileInput.value = "";
  }

  async function submitSelectedItem() {

    const typeSelect = document.getElementById("itemType");

    const selectedType = typeSelect?.value || "swimsuit";

    await addItemFromUI(selectedType);
  }

  function spinAll() {

    startRoulette({
      state: getState(),
      updateState,
      triggerHighlight
    });
  }

  function bindGlobal() {

    window.app = {
      spinAll,
      removeItem,
      addItemFromUI,
      submitSelectedItem,
      getState
    };
  }

  return {
    boot
  };
}
