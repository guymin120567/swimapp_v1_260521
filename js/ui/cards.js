export function renderSwimList(state) {

  const root =
    document.getElementById("swimList");

  if (!root) return;

  const list = state.swimsuits;

  if (!list.length) {

    root.innerHTML = `
      <div class="empty">
        등록된 수영복 없음
      </div>
    `;

    return;
  }

  root.innerHTML = list.map(item => `
    <div class="item-card">

      ${
        item.img
          ? `
            <img
              class="item-img"
              src="${item.img}"
            />
          `
          : `
            <div class="item-img empty"></div>
          `
      }

      <div class="item-name">
        ${item.text}
      </div>

      <button
        class="delete-btn"
        onclick="window.app.removeItem('swimsuit', ${item.id})"
      >
        삭제
      </button>

    </div>
  `).join("");
}

export function renderCapList(state) {

  const root =
    document.getElementById("capList");

  if (!root) return;

  const list = state.caps;

  if (!list.length) {

    root.innerHTML = `
      <div class="empty">
        등록된 수모 없음
      </div>
    `;

    return;
  }

  root.innerHTML = list.map(item => `
    <div class="item-card">

      ${
        item.img
          ? `
            <img
              class="item-img"
              src="${item.img}"
            />
          `
          : `
            <div class="item-img empty"></div>
          `
      }

      <div class="item-name">
        ${item.text}
      </div>

      <button
        class="delete-btn"
        onclick="window.app.removeItem('cap', ${item.id})"
      >
        삭제
      </button>

    </div>
  `).join("");
}
