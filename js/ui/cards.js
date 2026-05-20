
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
