import { renderPreview } from "./preview.js";
import { renderInputSection } from "./input.js";

/* =========================
   RENDER FUNCTIONS
========================= */

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
            : `
              <div class="card-placeholder">
                ${type === "swimsuit" ? "🩲" : "🧢"}
              </div>
            `
        }

        <div class="card-overlay">

          <div class="card-title">
            ${item.text}
          </div>

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
   SCROLL SNAP SYSTEM
========================= */

let snapInitialized = false;

export function initScrollSnap() {

  const sliders = document.querySelectorAll(".slider");

  if (!sliders.length) return;

  sliders.forEach(slider => {

    if (slider.dataset.snapInit) return;

    slider.dataset.snapInit = "true";

    let isScrolling;

    slider.addEventListener("scroll", () => {

      clearTimeout(isScrolling);

      isScrolling = setTimeout(() => {
        snapToCenter(slider);
      }, 120);

    });

  });

  snapInitialized = true;
}

function snapToCenter(slider) {

  const cards = slider.querySelectorAll(".item-card");

  if (!cards.length) return;

  const sliderRect = slider.getBoundingClientRect();

  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach(card => {

    const rect = card.getBoundingClientRect();

    const cardCenter = rect.left + rect.width / 2;
    const screenCenter = sliderRect.left + sliderRect.width / 2;

    const distance = Math.abs(cardCenter - screenCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  if (closestCard) {
    closestCard.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}
