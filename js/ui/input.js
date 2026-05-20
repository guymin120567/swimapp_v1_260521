export function renderInputSection() {

  const root =
    document.getElementById("inputRoot");

  if (!root) return;

  root.innerHTML = `
    <div class="input-section">

      <!-- 타입 선택 -->
      <select
        id="itemType"
        class="type-select"
      >
        <option value="swimsuit">
          🩲 수영복
        </option>

        <option value="cap">
          🧢 수모
        </option>
      </select>

      <!-- 이름 입력 -->
      <input
        id="itemText"
        class="text-input"
        type="text"
        placeholder="아이템 이름 입력"
      />

      <!-- 이미지 선택 -->
      <input
        id="itemImage"
        class="file-input"
        type="file"
        accept="image/*"
      />

      <!-- 추가 버튼 -->
      <button
        class="add-btn submit-btn"
        onclick="window.app.submitSelectedItem()"
      >
        추가하기
      </button>

    </div>
  `;
}
