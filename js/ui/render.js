import {
  renderLayout
} from "./renderLayout.js";

import {
  renderRoulette
} from "./renderRoulette.js";

import {
  renderLists
} from "./renderCoverflow.js";

let initialized = false;

let renderScheduled = false;

// =========================
// APP RENDER
// =========================
export function renderApp(){

  if(renderScheduled) return;

  renderScheduled = true;

  requestAnimationFrame(()=>{

    renderScheduled = false;

    if(!initialized){

      renderLayout();

      initialized = true;
    }

    renderRoulette();

    renderLists();
  });
}

export {
  renderRoulette,
  renderLists
};
