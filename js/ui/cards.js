let activeIndexMap = {
  swimsuit: 0,
  cap: 0
};

/* =========================
   RENDER SWIM
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
   RENDER CAP
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
   CARD (🌊 wave + transition)
========================= */

function createCard(item, type, index, activeIndex) {

  const distance = index - activeIndex;
  const abs = Math.abs(distance);

  const scale = Math.max(1 - abs * 0.12, 0.72);
  const opacity = Math.max(1 - abs * 0.15, 0.35);

  // 🌊 시간 기반 물결
  const time = Date.now() * 0.002;
  const wave = Math.sin(time + distance * 0.8) * 6;

  return `
    <div
      class="item-card wave-enter"
      style="
        transform:
          translateY(${wave}px)
          scale(${scale});
        opacity: ${opacity};
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
   SELECT CARD
========================= */

export function selectCard(type, index) {
  setActiveIndex(type, index);
}

/* =========================
   WAVE CLEANUP (transition 자연화)
========================= */

export function runWaveCleanup() {

  requestAnimationFrame(() => {

    document.querySelectorAll(".wave-enter").forEach(el => {
      setTimeout(() => {
        el.classList.remove("wave-enter");
      }, 450);
    });

  });
}
