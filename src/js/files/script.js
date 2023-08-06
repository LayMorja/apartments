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
        const map = L.map('map').setView([56.045206, 92.886154], 18);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 20,
          attribution: '© OpenStreetMap',
        }).addTo(map);

        const myIcon = L.icon({
          iconUrl: 'img/icons/target.svg',
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

  upButton.addEventListener('click', () => {
    scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
});

const mapButton = document.querySelector('#map-button');
mapButton.addEventListener('click', () => {
  setTimeout(() => {
    const map = L.map('work-map').setView([56.045206, 92.886154], 12);
    console.log('Work map init');

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '© OpenStreetMap',
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: 'img/icons/target.svg',
      iconSize: [42, 50],
      iconAnchor: [21, 50],
      popupAnchor: [0, -50],
    });

    const marker = L.marker([56.045222, 92.88879], { icon: myIcon }).addTo(map);

    marker.bindPopup(
      '<p class="footer__map-content">Красноярск, ул. Караульная 88, БЦ Дубль, оф.7-31</p>'
    );
  }, 500);
});

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

const renderQuestion = function (index) {
  const currentQuestion = quizData[index];
  questionName.textContent = currentQuestion.question;
  quizItems.textContent = '';
  quizAdd.textContent = '';
  quizWrapper.textContent = '';
  currentQuestion.type !== 'radio' ? (quizNext.disabled = true) : null;
  quizForm.classList.contains('quiz__form--slider')
    ? quizForm.classList.remove('quiz__form--slider')
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
              <img src="../img/popup/${el.img}" />
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

  if (currentQuestion.description) {
    quizAdd.innerHTML = currentQuestion.description;
  }
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
    const formData = new FormData();
    for (let key in answers) {
      formData.append(key, answers[key]);
    }
    questionIndex = 0;
    renderQuestion(questionIndex);
    flsModules.popup.open('#recall');
  }
});

document.addEventListener('DOMContentLoaded', renderQuestion(questionIndex));
