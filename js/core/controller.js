export function initController() {

  async function boot() {

    const saved = await loadDB();

    const mergedState = {
      ...structuredClone(defaultState),
      ...(saved || {})
    };

    setInternalState(mergedState);

    renderApp(getState());

    bindGlobal();

    console.log("APP BOOT SUCCESS");

    // ⭐⭐⭐ 여기 추가 (핵심)
    initScrollSnap();
  }

  ...
}
