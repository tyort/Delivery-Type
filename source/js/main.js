import Inputmask from "inputmask";

const pageDelivery = document.querySelector(`.page-delivery`);
const form = pageDelivery.querySelector(`form`);
const username = form.querySelector(`#block-name`);
const phone = form.querySelector(`#block-phone`);
const address = form.querySelector(`#block-address`);
const comment = form.querySelector(`#block-comment`);

const inputMask = new Inputmask(`+7 (___) ___-__-__`);
inputMask.mask(phone);

console.log(inputMask);

form.addEventListener(`input`, (evt) => {
  evt.preventDefault();
  checkInputs();
});

function checkInputs() {

  const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const nameSample = /^[а-яА-ЯёЁ-]+$/u;

  const usernameValue = username.value.trim();
  const phoneValue = phone.value.trim();
  const addressValue = address.value.trim();
  const commentValue = comment.value.trim();

  if (!nameSample.test(usernameValue)) {
    setErrorView(username);
  } else {
    setSuccessView(username);
  }
}

function setErrorView(input) {
  const formControl = input.parentElement;
  formControl.classList.toggle(`error`, true);
}

function setSuccessView(input) {
  const formControl = input.parentElement;
  formControl.classList.toggle(`error`, false);
}


// form.addEventListener(`input`, (evt) => {
//   const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
//   const mailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
//   const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

//   if (evt.target.className === `field-phone`) {
//     if (!phoneSample.test(evt.target.value)) {
//       evt.target.setCustomValidity(`Напиши номер правильно`);

//     } else {
//       evt.target.setCustomValidity(``);
//     }

//   } else if (evt.target.className === `field-email`) {
//     if (!mailSample.test(evt.target.value)) {
//       evt.target.setCustomValidity(`Напиши email правильно`);

//     } else {
//       evt.target.setCustomValidity(``);
//     }
//   } else if (evt.target.className === `field-name`) {
//     if (!nameSample.test(evt.target.value)) {
//       evt.target.setCustomValidity(`Напиши ФИО правильно`);

//     } else {
//       evt.target.setCustomValidity(``);
//     }
//   }
// });

// agreement.addEventListener(`change`, (evt) => {
//   if (evt.target.checked) {
//     btn.removeAttribute(`disabled`);
//     return;
//   }
//   btn.setAttribute(`disabled`, `disabled`);
// });

// window.addEventListener(`mapWasLoaded`, () => {
//   window.ymaps.ready(init);
// });

// function init() {
//   let myMap = new window.ymaps.Map(`YMapsID`, {
//     center: [59.938635, 30.323118],
//     zoom: 15,
//   }, {
//     searchControlProvider: `yandex#search`
//   });

//   const myPlacemark = new window.ymaps.Placemark([59.938635, 30.323118], {
//     hintContent: `Круизы в Антарктику`,
//   }, {
//     iconLayout: `default#image`,
//     iconImageHref: `img/icon-map-marker.svg`,
//     iconImageSize: [18, 22],
//     iconImageOffset: [-9, -22],
//   });

//   myMap.geoObjects
// .add(myPlacemark);
//

