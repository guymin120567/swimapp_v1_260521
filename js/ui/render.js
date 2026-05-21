export function renderApp(){

  const app =
    document.getElementById(
      "app"
    );

  app.innerHTML = `

    <div class="container">

      <!-- TOP -->
      <div class="top-area">

        <h1 class="app-title">
          🐬 Swim Roulette
        </h1>

        <button class="spin-btn">
          오늘 뭐 입지?
        </button>

      </div>

      <!-- INPUT -->
      <div class="block">

        <div class="section-title">
          추가하기
        </div>

        <div class="input-area">

          <select>

            <option>
              🩱 수영복
            </option>

            <option>
              🧢 수모
            </option>

          </select>

          <input
            type="text"
            placeholder="이름 입력"
          />

          <input
            type="file"
            accept="image/*"
          />

          <button class="spin-btn">
            추가
          </button>

        </div>

      </div>

      <!-- SWIM -->
      <div class="block">

        <div class="section-title">
          🩱 수영복
        </div>

        <div class="slider">

          <div class="item-card active">

            <div class="card-inner">

              <div class="card-placeholder">
                🩱
              </div>

              <div class="card-overlay">

                <div class="card-title">
                  Arena Carbon
                </div>

                <button class="delete-btn">
                  ×
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      <!-- CAP -->
      <div class="block">

        <div class="section-title">
          🧢 수모
        </div>

        <div class="slider">

          <div class="item-card">

            <div class="card-inner">

              <div class="card-placeholder">
                🧢
              </div>

              <div class="card-overlay">

                <div class="card-title">
                  Speedo
                </div>

                <button class="delete-btn">
                  ×
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}
