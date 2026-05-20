import { initScrollSnap } from "./cards.js";

export function renderApp(state) {

  const root = document.getElementById("app");
  if (!root) return;

  root.innerHTML = `
    <div class="container">

      <section class="block roulette-block">
        <div class="section-title">🎰 룰렛</div>

        <div id="previewRoot" class="preview-box"></div>

        <button class="spin-btn" onclick="window.app.spinAll()">
          오늘 뭐 입지?
        </button>
      </section>

      <section class="block">
        <div class="section-header">
          <div class="section-title">🩲 수영복</div>
          <div class="count-badge">${state.swimsuits.length}</div>
        </div>

        <div id="swimList" class="slider"></div>
      </section>

      <section class="block">
        <div class="section-header">
          <div class="section-title">🧢 수모</div>
          <div class="count-badge">${state.caps.length}</div>
        </div>

        <div id="capList" class="slider"></div>
      </section>

      <section class="block add-block">
        <div class="section-title">➕ 아이템 추가</div>
        <div id="inputRoot"></div>
      </section>

    </div>
  `;

  renderPreview(state);
  renderSwimList(state);
  renderCapList(state);
  renderInputSection();

  // ⭐ 핵심: DOM 생성 후 스냅 초기화
  initScrollSnap();
}
