export function initTabs(){

  const buttons =
    document.querySelectorAll(
      ".tab-btn"
    );

  const pages =
    document.querySelectorAll(
      ".tab-page"
    );

  buttons.forEach((button)=>{

    button.addEventListener(
      "click",
      ()=>{

        const tab =
          button.dataset.tab;

        buttons.forEach((btn)=>{

          btn.classList.remove(
            "active"
          );
        });

        pages.forEach((page)=>{

          page.classList.remove(
            "active"
          );
        });

        button.classList.add(
          "active"
        );

        const target =
          document.getElementById(
            `${tab}Tab`
          );

        if(target){

          target.classList.add(
            "active"
          );
        }
      }
    );
  });
}
