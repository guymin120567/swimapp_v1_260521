export function renderPreview(state) {

  const root =
    document.getElementById("previewRoot");

  if (!root) return;

  const preview = state.preview;

  if (!preview) {

    root.innerHTML = `
      <div class="empty-preview">
        룰렛 결과가 여기에 표시됩니다
      </div>
    `;

    return;
  }

  root.innerHTML = `
    <div class="preview-grid">

      <div class="preview-card">

        ${
          preview.swimsuit?.img
            ? `
              <img
                class="preview-img s-img"
                src="${preview.swimsuit.img}"
              />
            `
            : `
              <div class="preview-img empty s-img"></div>
            `
        }

        <div class="preview-name">
          ${preview.swimsuit?.text || "-"}
        </div>

      </div>

      <div class="preview-card">

        ${
          preview.cap?.img
            ? `
              <img
                class="preview-img c-img"
                src="${preview.cap.img}"
              />
            `
            : `
              <div class="preview-img empty c-img"></div>
            `
        }

        <div class="preview-name">
          ${preview.cap?.text || "-"}
        </div>

      </div>

    </div>
  `;
}
