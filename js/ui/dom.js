export const dom = {

  app:null,

  capList:null,

  swimList:null,

  capTitle:null,

  swimTitle:null,

  capResultImage:null,

  swimResultImage:null,

  capResultName:null,

  swimResultName:null
};

export function initDOM(){

  dom.app =
    document.getElementById(
      "app"
    );
}
