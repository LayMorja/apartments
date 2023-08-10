// Подключение функционала "Чертогов Фрилансера"
// import Leaflet from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Swiper from 'swiper';
import { Grid, Navigation } from 'swiper/modules';
import { isMobile, menuClose } from './functions.js';
import { flsModules } from './modules.js';

// Подключение списка активных модулей
// import { flsModules } from "./modules.js";

// if (isMobile.any()) {
//   document.documentElement.classList.add('mobile');

//   (function closeMenu() {
//     let x1 = null;
//     let y1 = null;
//     let isActive = false;

//     const handleTouchStart = function (e) {
//       if (e.target.closest('.menu')) {
//         isActive = true;
//       }
//       x1 = e.touches[0].clientX;
//       y1 = e.touches[0].clientY;
//     };

//     const handleTouchMove = function (e) {
//       if (!isActive || !x1 || !y1) return;
//       let x2 = e.touches[0].clientX;
//       let y2 = e.touches[0].clientY;

//       let xDiff = x2 - x1;
//       let yDiff = y2 - y1;

//       if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff > 0) menuClose();
//       x1 = null;
//       y1 = null;
//       isActive = false;
//     };

//     document.addEventListener('touchstart', handleTouchStart, false);
//     document.addEventListener('touchmove', handleTouchMove, false);
//   })();
// }

const parentDir = document.querySelector('.parent-dir').textContent;

document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('#map');

  const observerCb = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const map = L.map('map').setView([56.045206, 92.886154], 18);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '© OpenStreetMap',
        }).addTo(map);

        const myIcon = L.icon({
          iconUrl: `img/icons/target.svg`,
          iconSize: [67, 81],
          iconAnchor: [34, 81],
          popupAnchor: [0, -81],
        });

        const marker = L.marker([56.045222, 92.88879], { icon: myIcon }).addTo(map);

        marker.bindPopup(
          '<p class="footer__map-content">Красноярск, ул. Караульная 88, БЦ Дубль, оф.7-31</p>'
        );

        observer.unobserve(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(observerCb, {
    root: null,
    threshold: 0.2,
  });
  observer.observe(map);

  const section = document.querySelector('.reviews');
  const modalObserverCb = function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        flsModules.popup.open('#reminder');
        observer.unobserve(entry.target);
      }
    });
  };
  const modalObserver = new IntersectionObserver(modalObserverCb, {
    root: null,
    threshold: 0.2,
  });
  modalObserver.observe(section);

  document.querySelector('.contacts__up').addEventListener('click', () => {
    scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });

  const moreButton = document.querySelector('[data-works-more]');
  const moreWorkBlocks = Array.from(document.querySelectorAll('.item-variants[hidden]'));
  let lastIndex = 0;

  if (!moreWorkBlocks) {
    moreButton.hidden = true;
    return;
  }

  const loadMoreBlocks = function () {
    moreWorkBlocks.slice(lastIndex, lastIndex + 3).map(el => {
      const currentFilter = JSON.parse(localStorage.getItem('currentFilter'));
      let flag = true;
      for (let key in currentFilter) {
        // Если выбран плейсхолдер - скипаем
        if (!currentFilter[key]) continue;
        // Если внутри элемента нет значения, скрываем его
        if (!el.dataset[key].split(',').includes(currentFilter[key])) {
          flag = false;
        }
      }
      flag ? (el.hidden = false) : null;
      el.classList.remove('item-variants--hidden');
    });
    lastIndex += 3;

    if (lastIndex >= moreWorkBlocks.length) {
      moreButton.hidden = true;
      moreButton.removeEventListener('click', loadMoreBlocks);
    }
  };

  moreButton.addEventListener('click', loadMoreBlocks);
});

const mapButton = document.querySelector('#map-button');
const workItems = document.querySelectorAll('.item-variants');

mapButton.addEventListener('click', () => {
  setTimeout(() => {
    const map = L.map('work-map').setView([56.045206, 92.886154], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: `img/icons/target.svg`,
      iconSize: [42, 50],
      iconAnchor: [21, 50],
      popupAnchor: [0, -50],
    });

    workItems.forEach(function (item) {
      const title = item.querySelector('.item-variants__title').textContent;
      const imageSource = item.querySelector('img').src;
      const itemModal = item.querySelector('.item-variants__content').dataset.popup;
      const descriptionItems = item.querySelectorAll(
        '.item-variants__info-table-row > *:last-child'
      );
      const coords = item
        .querySelector('.item-variants__coords')
        .textContent.split(', ')
        .map(el => parseFloat(el));

      const popupHTML = `<div class="modal-work" data-popup="${itemModal}"><div class="modal-work__content"><div class="modal-work__image"><img src="${imageSource}" alt="" /></div><div class="modal-work__body"><h3 class="modal-work__title">${title}</h3><ul class="modal-work__list"><li class="modal-work__item"><span class="modal-work__type">Срок сдачи</span><span class="modal-work__value">${descriptionItems[0].textContent}</span></li><li class="modal-work__item"><span class="modal-work__type">Ипотека</span><span class="modal-work__value">${descriptionItems[1].textContent}</span></li><li class="modal-work__item"><span class="modal-work__type">Застройщик</span><span class="modal-work__value">${descriptionItems[2].textContent}</span></li></ul></div></div><div class="modal-work__activities"><button type="button" data-popup="${itemModal}" class="modal-work__more">Подробнее</button><button type="button" data-popup="#recall" class="modal-work__popup button"><span>Записаться на просмотр</span></button></div></div>`;

      const popup = L.popup({
        content: popupHTML,
        minWidth: 290,
        maxWidth: 453,
      });
      const marker = L.marker(coords, { icon: myIcon }).addTo(map);

      marker.bindPopup(popup);
    });
  }, 500);
});

//* Quiz ====================================================================================================

const quizData = [
  {
    question: 'Какие районы Красноярска вы рассматриваете?',
    question_type: 'Интересующие районы',
    type: 'checkbox',
    answers: [
      'Центральный район',
      'Советский район',
      'Октябрьский район',
      'Железнодорожный район',
      'Свердловский район',
      'Ленинский район',
      'Кировкий район',
      'Не важно',
    ],
  },
  {
    question: 'Сколько комнат должно быть в вашей квартире?',
    question_type: 'Кол-во комнат',
    type: 'slider',
    answers: [
      { name: 'Студия', img: '01.png' },
      { name: '1-комнатная', img: '02.png' },
      { name: 'Евро 2-комнатная', img: '03.png' },
      { name: '3-комнатная', img: '01.png' },
      { name: 'Евро 3-комнатная', img: '02.png' },
    ],
  },
  {
    question: 'На какую сумму Вы планируете приобрести квартиру?',
    question_type: 'Интересующая стоимость',
    type: 'checkbox',
    answers: ['до 4 млн.', 'до 5 млн.', 'до 6 млн.', 'от 7 млн. и более'],
  },
  {
    question: 'Покупка в ипотеку?',
    question_type: 'Покупка в ипотеку',
    type: 'radio',
    answers: ['Да', 'Нет'],
    description:
      '<p>Есть возможность приобрести квартиру в ипотеку, без дополнительных справок, без первоначального взноса и под ставку от 5%</p>',
  },
  {
    question: 'Год сдачи?',
    question_type: 'Год сдачи',
    type: 'checkbox',
    answers: ['2023', '2024', '2025', 'Готовое'],
  },
  {
    question: 'Какой тип отделки рассматриваете?',
    question_type: 'Тип отделки',
    type: 'checkbox-images',
    answers: [
      { name: 'Чистовая (под ключ)', img: 'ready.png' },
      { name: 'Предчистовая', img: 'not-ready.png' },
    ],
    description: `<p>Чистовая отделка позволит сэкономить деньги на ремонте и быстро заехать после сдачи дома.</p>
      <p>Предчистовая отделка избавит от лишнего демонтажа и позволит воплотить все ваши идеи.</p>`,
  },
  {
    question: 'Выберите то что для вас важно:',
    question_type: 'Важно для клиента',
    type: 'checkbox',
    answers: [
      'Школа, детские сады',
      'Автобусная остановка',
      'Парковка',
      'Красивый вид из окна',
      'Места для прогулок',
      'Другое',
    ],
  },
];

let questionIndex = 0;
const answers = {};
quizData.forEach(el => {
  answers[el.question_type] = [];
});

const quizForm = document.querySelector('.quiz__form');
const quizItems = document.querySelector('.quiz__items');
const quizWrapper = document.querySelector('.quiz__wrapper');
const quizNext = document.querySelector('.quiz__next');
const quizPrev = document.querySelector('.quiz__prev');
const questionName = document.querySelector('.quiz__question');
const progressBar = document.querySelector('.quiz__progress-line');
const progressPercent = document.querySelector('.quiz__progress-percent');
const quizAdd = document.querySelector('.quiz__add');
const thanksModal = document.querySelector('.thanks-popup');

const renderQuestion = function (index) {
  const currentQuestion = quizData[index];
  questionName.textContent = currentQuestion.question;
  quizItems.textContent = '';
  quizAdd.textContent = '';
  quizWrapper.textContent = '';
  currentQuestion.type !== 'radio' ? (quizNext.disabled = true) : (quizNext.disabled = false);
  quizForm.classList.contains('quiz__form--slider')
    ? quizForm.classList.remove('quiz__form--slider')
    : null;
  quizForm.classList.contains('quiz__form--last')
    ? quizForm.classList.remove('quiz__form--last')
    : null;
  quizForm.classList.contains('quiz__form--checkbox-image')
    ? quizForm.classList.remove('quiz__form--checkbox-image')
    : null;
  let percentage =
    index + 1 === quizData.length ? '99%' : Math.round(((index + 1) / quizData.length) * 100) + '%';
  progressBar.style.width = percentage;
  progressPercent.textContent = percentage;

  if (currentQuestion.type === 'checkbox') {
    currentQuestion.answers.forEach((el, idx) => {
      quizItems.insertAdjacentHTML(
        'beforeend',
        `<div class="quiz__checkbox checkbox">
          <input
            id="quiz_${index}_${idx}"
            class="checkbox__input"
            type="checkbox"
            value="${el}"
            name="${currentQuestion.question_type}" />
          <label for="quiz_${index}_${idx}" class="checkbox__label">
            <span class="checkbox__text">${el}</span>
          </label>
        </div>`
      );
    });
  }
  if (currentQuestion.type === 'radio') {
    currentQuestion.answers.forEach((el, idx) => {
      quizItems.insertAdjacentHTML(
        'beforeend',
        `<div class="quiz__option option">
          <input hidden id="quiz_radio_${idx}" class="option__input" ${
            idx === 0 ? 'checked' : ''
          } type="radio" value="${el}" name="${currentQuestion.question_type}">
          <label for="quiz_radio_${idx}" class="option__label"><span class="option__text">${el}</span></label>
        </div>`
      );
    });
  }
  if (currentQuestion.type === 'slider') {
    !quizForm.classList.contains('quiz__form--slider')
      ? quizForm.classList.add('quiz__form--slider')
      : null;

    currentQuestion.answers.forEach((el, idx) => {
      quizWrapper.insertAdjacentHTML(
        'beforeend',
        `<div class="quiz__checkbox checkbox swiper-slide">
          <input
            id="quiz_${index}_${idx}"
            class="checkbox__input"
            type="checkbox"
            value="${el.name}"
            name="${currentQuestion.question_type}" />
          <label for="quiz_${index}_${idx}" class="checkbox__label">
            <span class="checkbox__text">${el.name}</span>
            <div class="checkbox__image">
              <img src="img/quiz/${el.img}" />
              <div class="swiper-lazy-preloader swiper-lazy-preloader-black"></div>
            </div>
          </label>
        </div>`
      );
    });

    const popupSlider = new Swiper('.quiz__slider', {
      modules: [Navigation, Grid],
      observer: true,
      observeParents: true,
      slidesPerView: 3,
      spaceBetween: 15,
      speed: 800,
      lazy: true,

      navigation: {
        prevEl: '.swiper-button-prev',
        nextEl: '.swiper-button-next',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
      },
    });
  }
  if (currentQuestion.type === 'checkbox-images') {
    !quizForm.classList.contains('quiz__form--checkbox-image')
      ? quizForm.classList.add('quiz__form--checkbox-image')
      : null;
    currentQuestion.answers.forEach((el, idx) => {
      quizItems.insertAdjacentHTML(
        'beforeend',
        `<div class="quiz__checkbox checkbox">
          <input
            id="quiz_${index}_${idx}"
            class="checkbox__input"
            type="checkbox"
            value="${el.name}"
            name="${currentQuestion.question_type}" />
          <label for="quiz_${index}_${idx}" class="checkbox__label">
            <span class="checkbox__text">${el.name}</span>
            <div class="checkbox__image">
              <img src="img/quiz/${el.img}" />
            </div>
          </label>
        </div>`
      );
    });
  }

  if (currentQuestion.description) {
    quizAdd.innerHTML = currentQuestion.description;
  }
};

const sendQuizForm = function (e) {
  e.preventDefault();
  const formData = new FormData();
  for (let key in answers) {
    formData.append(key, answers[key]);
  }
  let xhr = new XMLHttpRequest();
  const formAction = quizForm.action ? quizForm.action : 'mail.php';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const openModal = location.hash;
        flsModules.popup.close(openModal);

        questionIndex = 0;
        renderQuestion(questionIndex);

        setTimeout(() => {
          thanksModal.classList.add('_active');
        }, 800);
        setTimeout(() => {
          thanksModal.classList.remove('_active');
        }, 2000);
      }
    }
  };
  xhr.open('POST', formAction, true);
  xhr.send(formData);
};

const renderLastSlide = function () {
  quizForm.classList.add('quiz__form--last');
  quizNext.disabled = true;
  questionName.textContent = 'Оставьте свой номер телефона';
  quizItems.textContent = '';
  quizAdd.textContent = '';
  quizWrapper.textContent = '';

  quizItems.insertAdjacentHTML(
    'beforeend',
    `<div class="popup__form-item popup__form-item--tel">
        <span>+7</span>
        <input
          autocomplete="off"
          type="tel"
          name="Номер телефона"
          placeholder="(___) ___-__-__"
          class="input input--phone" />
      </div>
      <div class="popup__form-item popup__form-item--checkbox">
        <div class="popup__checkbox checkbox">
          <input
            id="c_3"
            checked
            class="checkbox__input input-check"
            type="checkbox"
            value="Согласен"
            name="Согласие на ОПД" />
          <label for="c_3" class="checkbox__label"
            ><span class="checkbox__text"
              >Согласен с условиями
              <a href="javascript:void(0)" target="_blank">конфидециальных данных</a></span
            ></label
          >
        </div>
      </div>
      <div class="popup__form-item">
        <button type="submit" class="popup__button button _reverse">
          <span>Отправить</span>
        </button>
      </div>`
  );
  const quizPhone = quizForm.querySelector('.input--phone');
  flsModules.inputmask = Inputmask({ mask: '(999) 999-99-99' }).mask(quizPhone);

  quizForm.addEventListener('submit', e => sendQuizForm(e));
};

quizForm.addEventListener('change', function (e) {
  if (e.target.checked) quizNext.disabled = false;
  if (!e.target.checked && [...new FormData(quizForm)].length === 0) quizNext.disabled = true;
});

quizPrev.addEventListener('click', function (e) {
  e.preventDefault();

  if (questionIndex - 1 >= 0) {
    questionIndex--;
    renderQuestion(questionIndex);
  }
});

quizNext.addEventListener('click', function (e) {
  e.preventDefault();

  const currentAnswers = [...new FormData(quizForm)].map(el => el[1]);
  answers[Object.keys(answers)[questionIndex]] = currentAnswers;

  questionIndex++;
  if (questionIndex != quizData.length) {
    renderQuestion(questionIndex);
  } else {
    renderLastSlide();
  }
});

document.addEventListener('DOMContentLoaded', renderQuestion(questionIndex));
