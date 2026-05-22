import {
    .map((item,i)=>{

      const realIndex =
        start + i;

      return renderCard(
        item,
        realIndex,
        activeIndex,
        type
      );
    })
    .join("");
}

// =========================
// CARD
// =========================
function renderCard(
  item,
  index,
  activeIndex,
  type
){

  const distance =
    Math.abs(index - activeIndex);

  const active =
    distance === 0;

  const scale =
    Math.max(0.72,1 - distance * 0.12);

  const opacity =
    Math.max(0.35,1 - distance * 0.18);

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      data-type="${type}"
      data-index="${index}"
      style="
        transform:
          scale(${scale})
          translateY(${distance * 10}px);

        opacity:${opacity};
        z-index:${100-distance};
      "
    >

      <div class="card-inner">

        ${
          item.image
          ? `
            <img
              src="${item.image}"
              class="card-image"
            />
          `
          : `
            <div class="card-placeholder">
              🌊
            </div>
          `
        }

        <div class="card-overlay">

          <div class="card-title">
            ${item.name}
          </div>

          <button
            class="delete-btn"
            data-type="${type}"
            data-id="${item.id}"
          >
            ×
          </button>

        </div>

      </div>

    </div>
  `;
}
