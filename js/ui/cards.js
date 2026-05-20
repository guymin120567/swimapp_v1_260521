export function renderSwimList(state) {

  const root = document.getElementById("swimList");
  if (!root) return;

  if (!state.swimsuits.length) {
    root.innerHTML = `<div class="empty-card">등록된 수영복 없음</div>`;
    return;
  }

  root.innerHTML = state.swimsuits
    .map(item => createCard(item, "swimsuit"))
    .join("");
}

export function renderCapList(state) {

  const root = document.getElementById("capList");
  if (!root) return;

  if (!state.caps.length) {
    root.innerHTML = `<div class="empty-card">등록된 수모 없음</div>`;
    return;
  }

  root.innerHTML = state.caps
    .map(item => createCard(item, "cap"))
    .join("");
}

function createCard(item, type) {

  return `
    <div class="item-card">
      <div class="card-inner">

        ${
          item.img
            ? `<img src="${item.img}" class="card-image"/>`
            : `<div class="card-placeholder">${type === "swimsuit" ? "🩲" : "🧢"}</div>`
        }

        <div class="card-overlay">
          <div class="card-title">${item.text}</div>

          <button
            class="delete-btn"
            onclick="window.app.removeItem('${type}', ${item.id})"
          >
            ×
          </button>
        </div>

      </div>
    </div>
  `;
}

/* =========================
   CENTER SNAP + ACTIVE UX
========================= */

export function initScrollSnap() {

  const sliders = document.querySelectorAll(".slider");
  if (!sliders.length) return;

  sliders.forEach(slider => {

    if (slider.dataset.snapInit) return;
    slider.dataset.snapInit = "true";

    let timer;

    const updateActive = () => {

      const cards = slider.querySelectorAll(".item-card");
      const rect = slider.getBoundingClientRect();

      let closest = null;
      let min = Infinity;

      cards.forEach(card => {

        const r = card.getBoundingClientRect();

        const center = r.left + r.width / 2;
        const screen = rect.left + rect.width / 2;

        const dist = Math.abs(center - screen);

        if (dist < min) {
          min = dist;
          closest = card;
        }
      });

      cards.forEach(c => c.classList.remove("active"));
      if (closest) closest.classList.add("active");
    };

    slider.addEventListener("scroll", () => {

      clearTimeout(timer);

      updateActive();

      timer = setTimeout(() => {
        snapToCenter(slider);
      }, 120);
    });

  });
}

function snapToCenter(slider) {

  const cards = slider.querySelectorAll(".item-card");
  if (!cards.length) return;

  const rect = slider.getBoundingClientRect();

  let closest = null;
  let min = Infinity;

  cards.forEach(card => {

    const r = card.getBoundingClientRect();

    const center = r.left + r.width / 2;
    const screen = rect.left + rect.width / 2;

    const dist = Math.abs(center - screen);

    if (dist < min) {
      min = dist;
      closest = card;
    }
  });

  if (closest) {
    closest.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}
