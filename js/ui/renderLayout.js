import {
  dom,
  cacheDOM
} from "./dom.js";

// =========================
// LAYOUT
// =========================
export function renderLayout(){

  // =========================
  // 이미 생성됨
  // =========================
  if(dom.initialized){

    cacheDOM();

    return;
  }

  dom.app.innerHTML = `

  <div class="container">

    <div class="roulette-wrap">

      <div class="roulette-slot">

        <div class="roulette-label">
          🧢 수모
        </div>

        <div class="roulette-card">

          <img
            id="capResultImage"
            class="card-image"
          />

          <div
            id="capResultPlaceholder"
            class="card-placeholder"
          >
            🌊
          </div>

          <div class="card-overlay">

            <div
              id="capResultName"
              class="roulette-name"
            >
              없음
            </div>

          </div>

        </div>

      </div>

      <div class="roulette-slot">

        <div class="roulette-label">
          🩲 수영복
        </div>

        <div class="roulette-card">

          <img
            id="swimResultImage"
            class="card-image"
          />

          <div
            id="swimResultPlaceholder"
            class="card-placeholder"
          >
            🌊
          </div>

          <div class="card-overlay">

            <div
              id="swimResultName"
              class="roulette-name"
            >
              없음
            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="spin-row">

      <button
        class="spin-btn"
        data-action="spin"
      >
        오늘 뭐 입지?
      </button>

    </div>

    <div class="block">

      <div
        class="section-title"
        id="capTitle"
      >
      </div>

      <div
        class="coverflow"
        id="capList"
      >
      </div>

    </div>

    <div class="block">

      <div
        class="section-title"
        id="swimTitle"
      >
      </div>

      <div
        class="coverflow"
        id="swimList"
      >
      </div>

    </div>

    <div class="block">

      <div class="section-title">
        ➕ 추가하기
      </div>

      <div class="input-area">

        <select id="itemType">

          <option value="cap">
            🧢 수모
          </option>

          <option value="swim">
            🩲 수영복
          </option>

        </select>

        <input
          id="itemText"
          type="text"
          placeholder="이름 입력"
        />

        <input
          id="itemImage"
          type="file"
          accept="image/*"
        />

        <button
          class="spin-btn"
          data-action="add"
        >
          추가
        </button>

      </div>

    </div>

  </div>
  `;

  dom.initialized = true;

  cacheDOM();
}
