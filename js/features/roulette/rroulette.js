import {
  renderPreview
} from "../ui/preview.js";

export function startRoulette({
  state,
  updateState,
  triggerHighlight
}) {

  if (state.spinning) return;

  if (
    !state.swimsuits.length ||
    !state.caps.length
  ) {
    return;
  }

  const swimsuitTarget =
    state.swimsuits[
      Math.floor(
        Math.random() *
        state.swimsuits.length
      )
    ];

  const capTarget =
    state.caps[
      Math.floor(
        Math.random() *
        state.caps.length
      )
    ];

  let index = 0;

  let speed = 0.25;

  const minSpeed = 0.02;

  const deceleration = 0.003;

  updateState({
    spinning: true
  });

  function loop() {

    index += speed;

    const swimsuitIndex =
      Math.floor(index) %
      state.swimsuits.length;

    const capIndex =
      Math.floor(index) %
      state.caps.length;

    renderPreview({
      ...state,

      preview: {
        swimsuit:
          state.swimsuits[swimsuitIndex],

        cap:
          state.caps[capIndex]
      }
    });

    speed -= deceleration;

    if (speed <= minSpeed) {

      updateState({
        spinning: false,

        preview: {
          swimsuit: swimsuitTarget,
          cap: capTarget
        }
      });

      triggerHighlight();

      return;
    }

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
