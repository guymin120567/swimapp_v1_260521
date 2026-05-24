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
           COVERFLOW
      ========================== -->

      <section
        id="coverflowSection"
        class="block"
      >
      </section>

    </div>
  `;
}
