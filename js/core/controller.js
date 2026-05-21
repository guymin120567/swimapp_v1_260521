// =========================
// INIT CONTROLLER
// =========================
export function initController(){

  // =========================
  // BOOT
  // =========================
  async function boot(){

    console.log(
      "APP BOOT START"
    );

    try{

      // 예시:
      // await loadState();
      // renderApp();

      console.log(
        "APP BOOT SUCCESS"
      );
    }
    catch(error){

      console.error(
        "BOOT ERROR",
        error
      );
    }
  }

  // =========================
  // RETURN
  // =========================
  return {
    boot
  };
}
