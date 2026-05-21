import {
  renderApp
} from "../ui/render.js";

export function initController(){

  async function boot(){

    renderApp();
  }

  return {
    boot
  };
}
