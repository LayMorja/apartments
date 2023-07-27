// Подключение функционала "Чертогов Фрилансера"
import { menuClose } from './functions.js';
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

(function closeMenu() {
  let x1 = null;
  let y1 = null;
  let isActive = false;

  const handleTouchStart = function (e) {
    if (e.target.closest('.menu')) {
      isActive = true;
    }
    x1 = e.touches[0].clientX;
    y1 = e.touches[0].clientY;
  };

  const handleTouchMove = function (e) {
    if (!isActive || !x1 || !y1) return;
    let x2 = e.touches[0].clientX;
    let y2 = e.touches[0].clientY;

    let xDiff = x2 - x1;
    let yDiff = y2 - y1;

    if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) menuClose();
    x1 = null;
    y1 = null;
    isActive = false;
  };

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
})();
