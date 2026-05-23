import {
  if(!target) return;

  target.classList.remove(
    "shuffle"
  );

  void target.offsetWidth;

  target.classList.add(
    "shuffle"
  );
}

// =========================
// WINNER
// =========================
function triggerWinnerPulse(){

  const cards =
    document.querySelectorAll(
      ".roulette-card"
    );

  cards.forEach(card=>{

    card.classList.remove(
      "winner"
    );

    void card.offsetWidth;

    card.classList.add(
      "winner"
    );
  });
}

// =========================
// CONFETTI
// =========================
function createConfetti(){

  const colors = [

    "#c084fc",
    "#a855f7",
    "#d8b4fe",
    "#9333ea",
    "#e9d5ff"
  ];

  for(let i=0;i<34;i++){

    const confetti =
      document.createElement(
        "div"
      );

    confetti.className =
      "confetti";

    confetti.style.left =
      Math.random() * 100 + "%";

    confetti.style.animationDelay =
      Math.random() * .35 + "s";

    confetti.style.transform =
      `rotate(${Math.random()*360}deg)`;

    confetti.style.background =
      colors[
        Math.floor(
          Math.random() *
          colors.length
        )
      ];

    confetti.style.opacity =
      .85 + Math.random() * .15;

    document.body.appendChild(
      confetti
    );

    setTimeout(()=>{

      confetti.remove();

    },2400);
  }
}
