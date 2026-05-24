export const dom = {

  initialized:false,

  // ROOT
  app:null,

  // TITLE
  capTitle:null,
  swimTitle:null,

  // LIST
  capList:null,
  swimList:null,

  // RESULT
  capResultImage:null,
  swimResultImage:null,

  capResultPlaceholder:null,
  swimResultPlaceholder:null,

  capResultName:null,
  swimResultName:null,

  // INPUT
  itemType:null,
  itemText:null,
  itemImage:null,

  // BUTTON
  addButton:null,
  spinButton:null
};

// =========================
// CACHE
// =========================
export function cacheDOM(){

  // ROOT
  dom.app =
    document.getElementById(
      "app"
    );

  // TITLE
  dom.capTitle =
    document.getElementById(
      "capTitle"
    );

  dom.swimTitle =
    document.getElementById(
      "swimTitle"
    );

  // LIST
  dom.capList =
    document.getElementById(
      "capList"
    );

  dom.swimList =
    document.getElementById(
      "swimList"
    );

  // RESULT IMAGE
  dom.capResultImage =
    document.getElementById(
      "capResultImage"
    );

  dom.swimResultImage =
    document.getElementById(
      "swimResultImage"
    );

  // PLACEHOLDER
  dom.capResultPlaceholder =
    document.getElementById(
      "capResultPlaceholder"
    );

  dom.swimResultPlaceholder =
    document.getElementById(
      "swimResultPlaceholder"
    );

  // NAME
  dom.capResultName =
    document.getElementById(
      "capResultName"
    );

  dom.swimResultName =
    document.getElementById(
      "swimResultName"
    );

  // INPUT
  dom.itemType =
    document.getElementById(
      "itemType"
    );

  dom.itemText =
    document.getElementById(
      "itemText"
    );

  dom.itemImage =
    document.getElementById(
      "itemImage"
    );

  // BUTTON
  dom.addButton =
    document.getElementById(
      "addButton"
    );

  dom.spinButton =
    document.getElementById(
      "spinButton"
    );
}

// =========================
// INIT
// =========================
export function initDOM(){

  cacheDOM();
}
