
import { renderPreview } from "./preview.js";
import { renderSwimList, renderCapList } from "./cards.js";
import { renderInputSection } from "./input.js";

export function renderApp(state) {

  const root = document.getElementById("app");
  if (!root) return;

  /* =========================
     🔥 핵심: 완전 초기화
  ========================= */
  root.replaceChildren();

  root.innerHTML = `
    <div class="container">

      <section class="block header-block">
        <div class="section-title">🧢 수모 🩲 수영복</div>
      </section>

      <section class="block roulette-block">

        <div class="section-title">
          오늘 뭐 입지?
        </div>

        <div id="previewRoot" class="preview-box"></div>

        <button class="spin-btn" onclick="window.app.spinAll()">
          SPIN
        </button>

      </section>

      <section class="block">
        <div class="section-title">🧢 수모</div>
        <div id="capList" class="slider"></div>
      </section>

      <section class="block">
        <div class="section-title">🩲 수영복</div>
        <div id="swimList" class="slider"></div>
      </section>

      <section class="block">
        <div class="section-title">아이템 추가</div>
        <div id="inputRoot"></div>
      </section>

    </div>
  `;

  /* =========================
     render pipeline
  ========================= */

  renderPreview(state);
  renderCapList(state);
  renderSwimList(state);
  renderInputSection();

  /* 🔥 Safari repaint 강제 */
  requestAnimationFrame(() => {
    root.style.display = "none";
    root.offsetHeight;
    root.style.display = "block";
  });
}
