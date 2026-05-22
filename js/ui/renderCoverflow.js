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

  // =========================
  // 5개 미만
  // =========================
  if(items.length < 5){

    return items
      .map((item,index)=>{

        const distance =
          index - activeIndex;

        return renderCard(
          item,
          index,
          activeIndex,
          type,
          distance
        );
      })
      .join("");
  }

  // =========================
  // 5개 이상
  // =========================
  const total =
    items.length;

  const visible = [];

  for(let i=-2;i<=2;i++){

    let index =
      activeIndex + i;

    if(index < 0){

      index =
        total + index;
    }

    if(index >= total){

      index =
        index - total;
    }

    visible.push({

      item:items[index],

      realIndex:index,

      distance:i
    });
  }

  return visible
    .map(data=>{

      return renderCard(
        data.item,
        data.realIndex,
        activeIndex,
        type,
        data.distance
      );
    })
    .join("");
}
