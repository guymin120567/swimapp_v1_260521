export const dom = {

  initialized:false,

  app:null,

  capList:null,
  swimList:null,

  capResultImage:null,
  swimResultImage:null,

  capResultPlaceholder:null,
  swimResultPlaceholder:null,

  capResultName:null,
  swimResultName:null
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
}
