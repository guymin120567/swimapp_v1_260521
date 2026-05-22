import {
  dom
} from "./dom.js";

export function renderLayout(){

  dom.app.innerHTML = `

  <div class="container">

    <div class="block">

      <div class="section-title">
        🎰 룰렛
      </div>

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

            <div
              id="capResultName"
              class="roulette-name"
            >
              없음
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

            <div
              id="swimResultName"
              class="roulette-name"
            >
              없음
            </div>

          </div>

        </div>

      </div>

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
      ></div>

      <div
        class="coverflow"
        id="capList"
      ></div>

    </div>

    <div class="block">

      <div
        class="section-title"
        id="swimTitle"
      ></div>

      <div
        class="coverflow"
        id="swimList"
      ></div>

    </div>

    <div class="block">

      <div class="section-title">
        ➕ 추가하기
      </div>

      <div class="input-area">

        <select id="itemType">
          <option value="cap">🧢 수모</option>
          <option value="swim">🩲 수영복</option>
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

  dom.capList =
    document.getElementById(
      "capList"
    );

  dom.swimList =
    document.getElementById(
      "swimList"
    );

  dom.capResultImage =
    document.getElementById(
      "capResultImage"
    );

  dom.capResultName =
    document.getElementById(
      "capResultName"
    );

  dom.swimResultImage =
    document.getElementById(
      "swimResultImage"
    );

  dom.swimResultName =
    document.getElementById(
      "swimResultName"
    );
}
