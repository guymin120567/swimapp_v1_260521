import {
                item.image
                ? `
                  <img
                    src="${item.image}"
                    class="card-image"
                    loading="lazy"
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
      })
      .join("");
}

// =========================
// CENTER
// =========================
function centerActive(
  wrap,
  activeIndex
){

  const target =
    wrap.querySelector(
      `.cover-card[data-index="${activeIndex}"]`
    );

  if(!target) return;

  const left =
    target.offsetLeft -
    (
      wrap.clientWidth / 2 -
      target.clientWidth / 2
    );

  wrap.scrollTo({

    left,

    behavior:"smooth"
  });
}
