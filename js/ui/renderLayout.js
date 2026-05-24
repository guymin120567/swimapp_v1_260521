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
  
    <div class="app-layout">

      <header class="top-header">
        Swim App
      </header>

      <main id="mainContent">

      </main>

    </div>
  `;
}
