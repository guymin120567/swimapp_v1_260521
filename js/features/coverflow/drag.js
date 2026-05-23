import {

  let closestIndex = 0;

  let closestDistance =
    Infinity;

  cards.forEach(card=>{

    const cardCenter =
      card.offsetLeft +
      card.clientWidth / 2;

    const distance =
      Math.abs(
        wrapCenter - cardCenter
      );

    if(distance < closestDistance){

      closestDistance =
        distance;

      closestIndex =
        Number(
          card.dataset.index
        );
    }
  });

  if(type === "cap"){

    setActiveCap(
      closestIndex
    );
  }
  else{

    setActiveSwim(
      closestIndex
    );
  }

  renderLists();

  centerCard(
    wrap,
    closestIndex
  );
}

// =========================
// CENTER
// =========================
function centerCard(
  wrap,
  index
){

  const target =
    wrap.querySelector(
      `.cover-card[data-index="${index}"]`
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
