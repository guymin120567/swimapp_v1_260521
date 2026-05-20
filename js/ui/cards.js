
let activeIndexMap = {
  swimsuit: 0,
  cap: 0
};

/* =========================
   SWIM
========================= */

export function renderSwimList(state) {

  const root = document.getElementById("swimList");
  if (!root) return;

  const list = state.swimsuits;

  if (!list.length) {
    root.innerHTML = `<div class="empty-card">등록된 수영복 없음</div>`;
    return;
  }

  const active = activeIndexMap.swimsuit;

  root.innerHTML = list
    .map((item, i) =>
      createCard(item, "swimsuit", i, active)
    )
    .join("");
}

/* =========================
   CAP
========================= */

export function renderCapList(state) {

  const root = document.getElementById("capList");
  if (!root) return;

  const list = state.caps;

  if (!list.length) {
    root.innerHTML = `<div class="empty-card">등록된 수모 없음</div>`;
    return;
  }

  const active = activeIndexMap.cap;

  root.innerHTML = list
    .map((item, i) =>
      createCard(item, "cap", i, active)
    )
    .join("");
}

/* =========================
   CARD
========================= */

function createCard(item, type, index, activeIndex) {

  const distance = Math.abs(index - activeIndex);

  const scale = Math.max(1 - distance * 0.12, 0.72);
  const opacity = Math.max(1 - distance * 0.15, 0.35);
  const zIndex = 100 - distance;

  return `
    <div
      class="item-card"
      style="
        transform: scale(${scale});
        opacity: ${opacity};
        z-index: ${zIndex};
      "
      onclick="window.app.selectCard('${type}', ${index})"
    >
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
            onclick="event.stopPropagation(); window.app.removeItem('${type}', ${item.id})"
          >
            ×
          </button>
        </div>

      </div>
    </div>
  `;
}

/* =========================
   ACTIVE INDEX
========================= */

export function setActiveIndex(type, index) {
  activeIndexMap[type] = index;
}

/* =========================
   SNAP (optional 유지)
========================= */

export function initScrollSnap() {

  const sliders = document.querySelectorAll(".slider");

  sliders.forEach(slider => {

    if (slider.dataset.snapInit) return;
    slider.dataset.snapInit = "true";

    let timer;

    slider.addEventListener("scroll", () => {

      clearTimeout(timer);

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
