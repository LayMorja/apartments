/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { removeClasses } from './functions.js';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import '../../scss/vendors/swiper.scss';
// Полный набор стилей из scss/libs/swiper.scss
// import '../../scss/vendors/swiper-full.scss';
// Полный набор стилей из node_modules
import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
  // Перечень слайдеров
  // Проверяем, есть ли слайдер на стронице
  if (document.querySelector('.item-variants__slider')) {
    // Указываем скласс нужного слайдера
    // Создаем слайдер
    new Swiper('.item-variants__slider', {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      /*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

      // Пагинация
      /*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },

      // Брейкпоинты
      /*
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
      // События
      on: {},
    });
  }

  if (document.querySelector('.reviews__slider')) {
    // Указываем скласс нужного слайдера
    // Создаем слайдер
    new Swiper('.reviews__slider', {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Pagination],
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      /*
			// Эффекты
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

      // Пагинация

      pagination: {
        el: '.reviews__pagination',
        clickable: true,
      },

      // Скроллбар
      /*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.reviews__button-prev',
        nextEl: '.reviews__button-next',
      },

      // Брейкпоинты

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }

  if (document.querySelector('.work-preview__slider')) {
    const thumbsSlider = new Swiper('.work-preview__thumbs', {
      modules: [Navigation, Thumbs],
      slidesPerView: 'auto',
      speed: 800,

      // breakpoints: {
      //   320: {
      //     slidesPerView: 3,
      //     spaceBetween: 15,
      //   },
      //   710: {
      //     slidesPerView: 4,
      //     spaceBetween: 20,
      //   },
      // },

      loop: false,
      preloadImages: false,
      lazy: true,
    });

    new Swiper('.work-preview__slider', {
      modules: [Navigation, Thumbs],
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },

      thumbs: {
        swiper: thumbsSlider,
      },

      // breakpoints: {
      //   320: {
      //     slidesPerView: 1,
      //     spaceBetween: 15,
      //   },
      //   992: {
      //     slidesPerView: 3,
      //   },
      //   1200: {
      //     slidesPerView: 3.4,
      //     spaceBetween: 20,
      //   },
      // },
    });
  }

  if (document.querySelector('.team__slider')) {
    const teamContentItems = Array.from(document.querySelectorAll('.team__content'));

    if (window.innerWidth > 992) {
      new Swiper('.team__slider', {
        // Указываем скласс нужного слайдера
        // Подключаем модули слайдера
        // для конкретного случая
        modules: [Navigation, Thumbs],
        slidesPerView: 3.4,
        spaceBetween: 20,
        speed: 800,

        //touchRatio: 0,
        //simulateTouch: false,
        loop: true,
        preloadImages: false,
        lazy: true,

        /*
        // Эффекты
        effect: 'fade',
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        */

        // Пагинация
        /*
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        */

        // Скроллбар
        /*
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
        */

        // Кнопки "влево/вправо"
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },

        // Брейкпоинты

        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2.4,
            spaceBetween: 20,
          },
          992: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 3.4,
            spaceBetween: 20,
          },
        },

        // События
        on: {
          click: function (swiper) {
            swiper.slideTo(swiper.clickedIndex % 4, 800);
          },
          slideChange: function (swiper) {
            const contentId = swiper.slides[swiper.activeIndex].dataset.contentId;
            removeClasses(teamContentItems, '_active');

            teamContentItems
              .filter(el => el.dataset.content === contentId)[0]
              .classList.add('_active');
          },
        },
      });
      return true;
    }

    const thumbsSlider = new Swiper('.team__thumbs', {
      modules: [Navigation, Thumbs],
      slidesPerView: 4,
      spaceBetween: 20,
      speed: 800,

      breakpoints: {
        320: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        710: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
      },

      loop: true,
      preloadImages: false,
      lazy: true,
    });

    new Swiper('.team__slider', {
      // Указываем скласс нужного слайдера
      // Подключаем модули слайдера
      // для конкретного случая
      modules: [Navigation, Thumbs],
      slidesPerView: 3.4,
      spaceBetween: 20,
      speed: 800,

      //touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      preloadImages: false,
      lazy: true,

      // Кнопки "влево/вправо"
      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },

      thumbs: {
        swiper: thumbsSlider,
      },

      // Брейкпоинты

      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 3.4,
          spaceBetween: 20,
        },
      },

      // События
      on: {
        click: function (swiper) {
          swiper.slideTo(swiper.clickedIndex % 4, 800);
        },
        slideChange: function (swiper) {
          const contentId = swiper.slides[swiper.activeIndex].dataset.contentId;
          removeClasses(teamContentItems, '_active');

          teamContentItems
            .filter(el => el.dataset.content === contentId)[0]
            .classList.add('_active');
        },
      },
    });
  }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  // Добавление классов слайдера
  // при необходимости отключить
  bildSliders();

  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener('load', function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});
