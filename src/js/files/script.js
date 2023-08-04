// Подключение функционала "Чертогов Фрилансера"
import { isMobile, menuClose } from './functions.js';
// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

if (isMobile.any()) {
  document.documentElement.classList.add('mobile');

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
}

document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map');
  const upButton = document.querySelector('.contacts__up');

  const observerCb = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ymaps.ready(function () {
          var myMap = new ymaps.Map('map', {
              center: [56.045168, 92.88421],
              zoom: 16,
            }),
            // Создаём макет содержимого.
            MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
              '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
            ),
            myPlacemark = new ymaps.Placemark(
              [56.045054, 92.888942],
              {
                hintContent: 'Наше расположение',
                balloonContent: 'Красноярск, ул. Караульная 88, БЦ Дубль, оф.7-31',
              },
              {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: 'img/icons/target.svg',
                // Размеры метки.
                iconImageSize: [67, 81],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-33, -85],
              }
            );

          myMap.geoObjects.add(myPlacemark);
        });

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCb, {
    root: null,
    threshold: 0.2,
  });

  observer.observe(map);

  upButton.addEventListener('click', () => {
    scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});
