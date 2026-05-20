import { renderPreview }
  from "./preview.js";

import {
  renderSwimList,
  renderCapList
} from "./cards.js";

import {
  renderInputSection
} from "./input.js";

export function renderApp(state) {

  const root =
    document.getElementById("app");

  if (!root) return;

  root.innerHTML = `
    <div class="container">

      <!-- 🎰 룰렛 결과 -->
      <section class="block roulette-block">

        <div class="section-title">
          🎰 룰렛
        </div>

        <div
          id="previewRoot"
          class="preview-box"
        ></div>

        <button
          class="spin-btn"
          onclick="window.app.spinAll()"
        >
          오늘 뭐 입지?
        </button>

      </section>

      <!-- 🩲 수영복 -->
      <section class="block">

        <div class="section-header">

          <div class="section-title">
            🩲 수영복
          </div>

          <div class="count-badge">
            ${
              state.swimsuits.length
            }
          </div>

        </div>

        <div
          id="swimList"
          class="slider"
        ></div>

      </section>

      <!-- 🧢 수모 -->
      <section class="block">

        <div class="section-header">

          <div class="section-title">
            🧢 수모
          </div>

          <div class="count-badge">
            ${
              state.caps.length
            }
          </div>

        </div>

        <div
          id="capList"
          class="slider"
        ></div>

      </section>

      <!-- ➕ 아이템 추가 -->
      <section class="block add-block">

        <div class="section-title">
          ➕ 아이템 추가
        </div>

        <div id="inputRoot"></div>

      </section>

    </div>
  `;

  renderPreview(state);

  renderSwimList(state);

  renderCapList(state);

  renderInputSection();
}
