import {
  getState
} from "../../state/state.js";

export function renderLists(){

  const target =
    document.getElementById(
      "listsSection"
    );

  if(!target) return;

  const state =
    getState();

  target.innerHTML = `

  <div class="list-page">

    <div class="list-block">

      <div class="list-header">

        <div class="list-title">
          🧢 수모 리스트
        </div>

        <button
          id="addCapButton"
          class="add-btn"
        >
          추가
        </button>

      </div>

      <div class="item-list">

        ${
          state.data.caps
            .map((item)=>{

              return `

              <div class="item-card">

                <div class="item-thumb-wrap">

                  ${
                    item.image
                    ? `
                    <img
                      src="${item.image}"
                      class="item-thumb"
                    />
                    `
                    : `
                    <div class="item-thumb placeholder">
                      🌊
                    </div>
                    `
                  }

                </div>

                <div class="item-info">

                  <div class="item-name">
                    ${item.name}
                  </div>

                </div>

              </div>

              `;
            })
            .join("")
        }

      </div>

    </div>

    <div class="list-block">

      <div class="list-header">

        <div class="list-title">
          🩲 수영복 리스트
        </div>

        <button
          id="addSwimButton"
          class="add-btn"
        >
          추가
        </button>

      </div>

      <div class="item-list">

        ${
          state.data.swims
            .map((item)=>{

              return `

              <div class="item-card">

                <div class="item-thumb-wrap">

                  ${
                    item.image
                    ? `
                    <img
                      src="${item.image}"
                      class="item-thumb"
                    />
                    `
                    : `
                    <div class="item-thumb placeholder">
                      🌊
                    </div>
                    `
                  }

                </div>

                <div class="item-info">

                  <div class="item-name">
                    ${item.name}
                  </div>

                </div>

              </div>

              `;
            })
            .join("")
        }

      </div>

    </div>

  </div>

  `;
}
