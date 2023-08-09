//* Валидцаия форм
import JustValidate from 'just-validate';
import { flsModules } from '../modules.js';

const thanksModal = document.querySelector('.thanks-popup');
const failCallback = function (fields) {
  const failedFields = Object.values(fields).filter(el => el.isValid === false);
  failedFields.forEach(function (field) {
    field.elem.closest('.popup__form-item').classList.add('popup__form-item--error');
  });
};
const validateCallback = function (e) {
  if (!e.isSubmitted) return;
  const failedFields = Object.values(e.fields);
  failedFields.forEach(function (field) {
    field.isValid
      ? field.elem.closest('.popup__form-item').classList.remove('popup__form-item--error')
      : null;
    !field.isValid
      ? field.elem.closest('.popup__form-item').classList.add('popup__form-item--error')
      : null;
  });
};
const successCallback = function (event) {
  const form = event.target;
  let formData = new FormData(form);
  let xhr = new XMLHttpRequest();
  const formAction = form.action ? form.action : 'mail.php';
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const openModal = location.hash;
        flsModules.popup.close(openModal);

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
  event.target.reset();
};

if (document.querySelector('#request-form')) {
  const validation = new JustValidate('#request-form');
  validation
    .addField('.input--name', [
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Введите не менее 2 символов',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Введите не более 15 символов',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!',
      },
    ])
    .addField('.input--phone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен',
      },
      {
        rule: 'function',
        validator: function (cur, item) {
          const phone = item['.input--phone']['elem'].inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите корректный телефон',
      },
    ])
    .addField('.input-check', [
      {
        rule: 'required',
        errorMessage: '',
      },
    ])
    .onFail(fields => failCallback(fields))
    .onValidate(e => validateCallback(e))
    .onSuccess(e => successCallback(e));
}
if (document.querySelector('#question-form')) {
  const validation = new JustValidate('#question-form');
  validation
    .addField('.input--name', [
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Введите не менее 2 символов',
      },
      {
        rule: 'maxLength',
        value: 15,
        errorMessage: 'Введите не более 15 символов',
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите имя!',
      },
    ])
    .addField('.input--phone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен',
      },
      {
        rule: 'function',
        validator: function (cur, item) {
          const phone = item['.input--phone']['elem'].inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите корректный телефон',
      },
    ])
    .addField('.input--question', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите текст вопроса!',
      },
    ])
    .addField('.input-check', [
      {
        rule: 'required',
        errorMessage: '',
      },
    ])
    .onFail(fields => failCallback(fields))
    .onValidate(e => validateCallback(e))
    .onSuccess(e => successCallback(e));
}
if (document.querySelector('#recall-form')) {
  const validation = new JustValidate('#recall-form');
  validation
    .addField('.input--phone', [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Телефон обязателен',
      },
      {
        rule: 'function',
        validator: function (cur, item) {
          const phone = item['.input--phone']['elem'].inputmask.unmaskedvalue();
          return phone.length === 10;
        },
        errorMessage: 'Введите корректный телефон',
      },
    ])
    .addField('.input-check', [
      {
        rule: 'required',
        errorMessage: '',
      },
    ])
    .onFail(fields => failCallback(fields))
    .onValidate(e => validateCallback(e))
    .onSuccess(e => successCallback(e));
}
