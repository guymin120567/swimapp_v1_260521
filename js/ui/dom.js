export const dom = {

  initialized:false,

  app:null,

  // =========================
  // LIST
  // =========================
  capList:null,

  swimList:null,

  // =========================
  // TITLE
  // =========================
  capTitle:null,

  swimTitle:null,

  // =========================
  // RESULT
  // =========================
  capResultImage:null,

  swimResultImage:null,

  capResultName:null,

  swimResultName:null,

  capResultPlaceholder:null,

  swimResultPlaceholder:null
};

// =========================
// INIT ROOT
// =========================
export function initDOM(){

  dom.app =
    document.getElementById(
      "app"
    );
}

// =========================
// CACHE
// =========================
export function cacheDOM(){

  dom.capList =
    document.getElementById(
      "capList"
    );

  dom.swimList =
    document.getElementById(
      "swimList"
    );

  dom.capTitle =
    document.getElementById(
      "capTitle"
    );

  dom.swimTitle =
    document.getElementById(
      "swimTitle"
    );

  dom.capResultImage =
    document.getElementById(
      "capResultImage"
    );

  dom.swimResultImage =
    document.getElementById(
      "swimResultImage"
    );

  dom.capResultName =
    document.getElementById(
      "capResultName"
    );

  dom.swimResultName =
    document.getElementById(
      "swimResultName"
    );

  dom.capResultPlaceholder =
    document.getElementById(
      "capResultPlaceholder"
    );

  dom.swimResultPlaceholder =
    document.getElementById(
      "swimResultPlaceholder"
    );
}
