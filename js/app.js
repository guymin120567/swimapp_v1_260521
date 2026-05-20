
import { initApp } from "./core/init.js";

/* =========================
   🧼 SAFARI CLEAN START
========================= */

(function safariHardReset() {

  // 🔥 service worker 제거 (PWA 겹침 원인 1순위)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(r => r.unregister());
    });
  }

  // 🔥 local DOM flush 방지용
  if (document.documentElement) {
    document.documentElement.style.display = "none";
    document.documentElement.offsetHeight;
    document.documentElement.style.display = "block";
  }

})();

initApp();
