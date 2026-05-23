export const dom = {

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

  swimResultName:null
};

// =========================
// INIT
// =========================
export function initDOM(){

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
}
