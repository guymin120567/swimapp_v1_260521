import { getState } from "../state/state.js";

let renderScheduled = false;

export function renderApp() {
  // 1️⃣ 렌더 폭주 방지
  if (renderScheduled) return;

  renderScheduled = true;

  requestAnimationFrame(() => {
    renderScheduled = false;

    const app = document.getElementById("app");
    const state = getState();

    app.innerHTML = `

    <div class="container">

      <!-- ROULETTE -->

      <div class="block">

        <div class="section-title">
          🎰 룰렛
        </div>

        <div class="roulette-wrap">

          <div class="roulette-slot cap">

            <div class="roulette-label">
              🧢 수모
            </div>

            ${
              state.selectedCap
              ? renderRouletteCard(state.selectedCap)
              : `
                <div class="empty-card">
                  수모 없음
                </div>
              `
            }

          </div>

          <div class="roulette-slot swim">

            <div class="roulette-label">
              🩲 수영복
            </div>

            ${
              state.selectedSwim
              ? renderRouletteCard(state.selectedSwim)
              : `
                <div class="empty-card">
                  수영복 없음
                </div>
              `
            }

          </div>

        </div>

        <button
          class="spin-btn"
          onclick="window.app.spinAll()"
        >
          오늘 뭐 입지?
        </button>

      </div>

      <!-- CAP -->

      <div class="block">

        <div class="section-title">
          🧢 수모 (${state.caps.length})
        </div>

        <div class="coverflow" data-type="cap">

          ${
            renderVisibleCards(
              state.caps,
              state.activeCapIndex,
              "cap"
            )
          }

        </div>

      </div>

      <!-- SWIM -->

      <div class="block">

        <div class="section-title">
          🩲 수영복 (${state.swimsuits.length})
        </div>

        <div class="coverflow" data-type="swim">

          ${
            renderVisibleCards(
              state.swimsuits,
              state.activeSwimIndex,
              "swim"
            )
          }

        </div>

      </div>

      <!-- INPUT -->

      <div class="block">

        <div class="section-title">
          ➕ 추가하기
        </div>

        <div class="input-area">

          <select id="itemType">
            <option value="cap">🧢 수모</option>
            <option value="swim">🩲 수영복</option>
          </select>

          <input
            id="itemText"
            type="text"
            placeholder="이름 입력"
          />

          <input
            id="itemImage"
            type="file"
            accept="image/*"
          />

          <button
            class="spin-btn"
            onclick="window.app.submitSelectedItem()"
          >
            추가
          </button>

        </div>

      </div>

    </div>

    `;
  });
}

function renderRouletteCard(item) {
  return `
    <div class="roulette-card">

      <div class="roulette-image-wrap">

        ${
          item.image
          ? `
            <img src="${item.image}" class="card-image" />
          `
          : `
            <div class="card-placeholder">
              🌊
            </div>
          `
        }

        <div class="ripple"></div>

      </div>

      <div class="roulette-name">
        ${item.name}
      </div>

    </div>
  `;
}

function renderVisibleCards(items, activeIndex, type) {
  if (!items.length) {
    return `
      <div class="empty-card">
        아이템 없음
      </div>
    `;
  }

  const start = Math.max(0, activeIndex - 2);
  const end = Math.min(items.length, activeIndex + 3);

  return items
    .slice(start, end)
    .map((item, i) => {
      const realIndex = start + i;

      return renderCard(
        item,
        realIndex,
        activeIndex,
        type
      );
    })
    .join("");
}

function renderCard(item, index, activeIndex, type) {
  const distance = Math.abs(index - activeIndex);

  const active = distance === 0;

  const scale = Math.max(0.72, 1 - distance * 0.12);
  const opacity = Math.max(0.35, 1 - distance * 0.18);

  return `
    <div
      class="cover-card ${active ? "active" : ""}"
      onclick="window.app.setActiveIndex('${type}', ${index})"
      style="
        transform: scale(${scale}) translateY(${distance * 10}px);
        opacity: ${opacity};
        z-index: ${100 - distance};
      "
    >

      <div class="card-inner">

        ${
          item.image
          ? `
            <img src="${item.image}" class="card-image" />
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
            onclick="
              event.stopPropagation();
              window.app.removeItem('${type}', '${item.id}')
            "
          >
            ×
          </button>

        </div>

      </div>

    </div>
  `;
}
