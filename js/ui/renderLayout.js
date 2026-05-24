export function renderLayout() {

  const app =
    document.getElementById(
      "app"
    );

  if (!app) {

    console.error(
      "#app NOT FOUND"
    );

    return;
  }

  app.innerHTML = `

    <div class="container">

      <!-- =========================
           ROULETTE
      ========================== -->

      <section
        id="rouletteSection"
        class="block"
      >
      </section>

      <!-- =========================
           CAP LIST
      ========================== -->

      <section class="block">

        <div class="section-title">
          수모
        </div>

        <div
          id="capListSection"
        >
        </div>

      </section>

      <!-- =========================
           SWIM LIST
      ========================== -->

      <section class="block">

        <div class="section-title">
          수영복
        </div>

        <div
          id="swimListSection"
        >
        </div>

      </section>

      <!-- =========================
           EXTRA
      ========================== -->

      <section
        id="extraSection"
        class="block"
      >
      </section>

    </div>
  `;
}
