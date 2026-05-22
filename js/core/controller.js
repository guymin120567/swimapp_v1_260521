import {
  // =========================
  function bindGlobal(){

    document.addEventListener(
      "click",
      async e=>{

        const action =
          e.target.dataset.action;

        if(action === "spin"){

          await spinAll();
        }

        if(action === "add"){

          await submitSelectedItem();
        }

        const removeBtn =
          e.target.closest(
            ".delete-btn"
          );

        if(removeBtn){

          e.stopPropagation();

          await removeItem(
            removeBtn.dataset.type,
            Number(
              removeBtn.dataset.id
            )
          );
        }

        const card =
          e.target.closest(
            ".cover-card"
          );

        if(card){

          setActiveIndex(
            card.dataset.type,
            Number(
              card.dataset.index
            )
          );
        }
      }
    );
  }

  return {
    boot
  };
}

// =========================
// UTIL
// =========================
function sleep(ms){

  return new Promise(resolve=>{

    setTimeout(resolve,ms);
  });
}

function clamp(value,min,max){

  return Math.min(
    Math.max(value,min),
    max
  );
}
