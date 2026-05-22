// =========================
// DOM CACHE
// =========================
export const dom = {

  app:null,

  roulette:null,

  capList:null,

  swimList:null,

  capResultImage:null,
  capResultName:null,

  swimResultImage:null,
  swimResultName:null
};

// =========================
// INIT DOM
// =========================
export function initDOM(){

  dom.app =
    document.getElementById(
      "app"
    );
}
