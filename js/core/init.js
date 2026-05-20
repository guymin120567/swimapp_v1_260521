import { initController } from "./controller.js";

export function initApp() {
  const app = initController();
  app.boot();
}
