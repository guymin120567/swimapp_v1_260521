function renderVisibleCards(
  items,
  activeIndex,
  type
){

  if(!items.length){

    return `
      <div class="empty-card">
        아이템 없음
      </div>
    `;
  }

  const start =
    Math.max(
      0,
      activeIndex - 2
    );

  const end =
    Math.min(
      items.length,
      activeIndex + 3
    );

  const visible =
    items.slice(start,end);

  return `

    <button
      class="nav-btn"
      onclick="
        window.app.slide(
          '${type}',
          -1
        )
      "
    >
      ‹
    </button>

    ${visible.map((item,i)=>{

      const realIndex =
        start + i;

      return renderCoverflowCard(
        item,
        realIndex,
        activeIndex,
        type
      );

    }).join("")}

    <button
      class="nav-btn"
      onclick="
        window.app.slide(
          '${type}',
          1
        )
      "
    >
      ›
    </button>

  `;
}
