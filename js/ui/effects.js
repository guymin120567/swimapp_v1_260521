export function triggerHighlight() {

  setTimeout(() => {

    const swimsuitImage =
      document.querySelector(".s-img");

    const capImage =
      document.querySelector(".c-img");

    if (swimsuitImage) {

      swimsuitImage.classList.remove(
        "highlight"
      );

      void swimsuitImage.offsetWidth;

      swimsuitImage.classList.add(
        "highlight"
      );
    }

    if (capImage) {

      capImage.classList.remove(
        "highlight"
      );

      void capImage.offsetWidth;

      capImage.classList.add(
        "highlight"
      );
    }

  }, 60);
}
