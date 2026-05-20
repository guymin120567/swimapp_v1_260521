function createCard(
  item,
  type
) {

  return `
    <div class="item-card">

      <div class="card-inner">

        ${
          item.img
            ? `
          <img
            src="${item.img}"
            class="card-image"
          />
        `
            : `
          <div class="card-placeholder">
            ${
              type === "swimsuit"
                ? "🩲"
                : "🧢"
            }
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

export function renderSwimList(
  state
) {

  const root =
    document.getElementById(
      "swimList"
    );

  if (!root) return;

  if (
    !state.swimsuits.length
  ) {

    root.innerHTML = `
      <div class="empty-card">
        등록된 수영복 없음
      </div>
    `;

    return;
  }

  root.innerHTML =
    state.swimsuits
      .map(item =>
        createCard(
          item,
          "swimsuit"
        )
      )
      .join("");
}

export function renderCapList(
  state
) {

  const root =
    document.getElementById(
      "capList"
    );

  if (!root) return;

  if (!state.caps.length) {

    root.innerHTML = `
      <div class="empty-card">
        등록된 수모 없음
      </div>
    `;

    return;
  }

  root.innerHTML =
    state.caps
      .map(item =>
        createCard(
          item,
          "cap"
        )
      )
      .join("");
}
