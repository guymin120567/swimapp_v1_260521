
/* =========================
   BASE
========================= */

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;

  color: white;

  background: radial-gradient(
      circle at top,
      #38bdf8 0%,
      #0ea5e9 25%,
      #075985 55%,
      #06121f 100%
  );

  overflow-x: hidden;
}

/* =========================
   CONTAINER
========================= */

.container {
  padding: 18px 12px 60px;
}

/* =========================
   SECTION TITLE
========================= */

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #bfe9ff;
  text-shadow: 0 0 12px rgba(56,189,248,0.25);
}

/* =========================
   SLIDER (중앙 카드 UX 핵심)
========================= */

.slider {
  display: flex;
  align-items: center;

  overflow-x: auto;

  padding: 42px 10px;

  scroll-behavior: smooth;

  gap: 0;
}

.slider::-webkit-scrollbar {
  display: none;
}

/* =========================
   CARD BASE
========================= */

.item-card {
  flex-shrink: 0;

  transition: transform .25s ease, opacity .25s ease;
}

/* 카드 크기 계단 구조 */
.item-card:nth-child(1) {
  width: 190px;
  height: 250px;
  margin-right: -40px;
  z-index: 5;
}

.item-card:nth-child(2) {
  width: 170px;
  height: 230px;
  margin-right: -50px;
  opacity: 0.95;
}

.item-card:nth-child(3) {
  width: 150px;
  height: 210px;
  margin-right: -55px;
  opacity: 0.88;
}

.item-card:nth-child(n+4) {
  width: 135px;
  height: 190px;
  margin-right: -60px;
  opacity: 0.8;
}

/* =========================
   ACTIVE CARD (중앙 강조)
========================= */

.item-card.active {
  transform: scale(1.08);
  z-index: 100;
}

.item-card.active .card-inner {
  border: 1px solid rgba(56,189,248,0.8);
  box-shadow:
    0 0 18px rgba(56,189,248,0.45),
    0 15px 40px rgba(0,0,0,0.4);
}

/* =========================
   CARD INNER (glass water)
========================= */

.card-inner {
  width: 100%;
  height: 100%;

  border-radius: 24px;

  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);

  border: 1px solid rgba(255,255,255,0.15);

  overflow: hidden;

  box-shadow:
    0 12px 30px rgba(0,0,0,0.35),
    inset 0 0 20px rgba(56,189,248,0.08);
}

/* =========================
   IMAGE
========================= */

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* =========================
   PLACEHOLDER
========================= */

.card-placeholder {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 54px;

  background: linear-gradient(
    135deg,
    rgba(56,189,248,0.25),
    rgba(3,105,161,0.4)
  );
}

/* =========================
   OVERLAY
========================= */

.card-overlay {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  padding: 12px;

  background: linear-gradient(
    to top,
    rgba(0,0,0,0.75),
    transparent
  );

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 13px;
  font-weight: 600;
  color: white;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* =========================
   DELETE BUTTON
========================= */

.delete-btn {
  width: 26px;
  height: 26px;

  border-radius: 50%;
  border: none;

  background: rgba(255,255,255,0.15);
  color: white;

  cursor: pointer;

  transition: 0.2s;
}

.delete-btn:hover {
  background: rgba(56,189,248,0.6);
  transform: scale(1.08);
}

/* =========================
   BUTTON (spin)
========================= */

.spin-btn {
  background: linear-gradient(
    135deg,
    #38bdf8,
    #0284c7
  );

  color: white;

  border: none;
  border-radius: 14px;

  padding: 14px 18px;

  font-weight: 700;

  box-shadow: 0 10px 25px rgba(3,105,161,0.35);

  transition: 0.2s;
}

.spin-btn:active {
  transform: scale(0.96);
}

/* =========================
   EMPTY STATE
========================= */

.empty-card {
  padding: 28px;
  text-align: center;

  color: rgba(255,255,255,0.6);

  border: 1px dashed rgba(255,255,255,0.2);
  border-radius: 16px;
}
