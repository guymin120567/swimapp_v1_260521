import {
  renderLayout
} from "../ui/renderLayout.js";

import {
  renderRoulette
} from "../features/roulette/renderRoulette.js";

import {
  renderLists
} from "../features/lists/renderLists.js";

import {
  initTabs
} from "../ui/tabs.js";

export function startApp(){

  renderLayout();

  renderRoulette();

  renderLists();

  initTabs();
}
