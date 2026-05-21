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

    const app =
      document.getElementById(
        "app"
      );

    if(!app){

      console.error(
        "#app NOT FOUND"
      );

      return;
    }

    // =========================
    // RENDER
    // =========================
    app.innerHTML = `

      <div class="container">

        <!-- TOP -->
        <div class="top-area">

          <h1 class="app-title">
            🐬 Swim Roulette
          </h1>

          <button
            class="spin-btn"
            onclick="alert('SPIN!')"
          >
            오늘 뭐 입지?
          </button>

        </div>

        <!-- INPUT -->
        <div class="block">

          <div class="section-title">
            추가하기
          </div>

          <div class="input-area">

            <select id="itemType">

              <option value="swim">
                🩱 수영복
              </option>

              <option value="cap">
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

            <div class="item-card">

              <div class="card-inner">

                <div class="card-placeholder">
                  🌊
                </div>

                <div class="card-overlay">

                  <div class="card-title">
                    Mizuno GX
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
                    Speedo Cap
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

    console.log(
      "APP BOOT SUCCESS"
    );
  }

  // =========================
  // RETURN
  // =========================
  return {
    boot
  };
}
