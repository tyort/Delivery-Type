import '../../node_modules/jquery-validation/dist/jquery.validate';

const pageDelivery = document.querySelector(`.page-delivery`);
const form = pageDelivery.querySelector(`form`);
const buttonForm = pageDelivery.querySelector(`button[type="submit"]`);
const pickupAddresses = pageDelivery.querySelector(`.delivery-feature--addresses`);
const buttonMap = pickupAddresses.querySelector(`button`);
const username = form.querySelector(`#block-name`);
const phone = form.querySelector(`#block-phone`);
const address = form.querySelector(`#block-address`);
const deliveryTypes = pageDelivery.querySelector(`.delivery-types`);
const deliveryButtons = pageDelivery.querySelectorAll(`.delivery-type`);
const pointsList = pageDelivery.querySelector(`.pick-up-points`);
let checkedPoints = [];
let myMap = null;

const pickupPoints = {
  'sand': [`Песчаная ул.`, [55.982502, 37.139599]],
  'underpine': [`Подсосенский пер.`, [55.977138, 37.152390]],
};

window.$(document).ready(() => {
  window.$(phone).mask(`+7 (999) 999-99-99`, {autoclear: false});
});

window.$.validator.addMethod(`checkMask`, function (value) {
  return /^\+7\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/g.test(value);
});

deliveryButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    deliveryButtons.forEach((btn) => {
      btn.style.backgroundColor = `#EDEEEF`;
      btn.style.color = `#999999`;
    });
    button.style.backgroundColor = `#FFFFFF`;
    button.style.color = `#215BF0`;
  });
});

phone.addEventListener(`blur`, () => {
  const phoneElement = document.querySelectorAll(`.form-control`)[1];
  const phoneInput = phoneElement.querySelector(`input`);

  if (phoneInput.className === `error`) {
    phoneElement.querySelector(`p`).style.visibility = `visible`;
    phoneElement.querySelector(`svg`).style.visibility = `visible`;
  } else {
    phoneElement.querySelector(`p`).style.visibility = `hidden`;
    phoneElement.querySelector(`svg`).style.visibility = `hidden`;
  }
});

deliveryTypes.addEventListener(`click`, (evt) => {
  if (evt.target.textContent === `Самовывоз`) {
    pickupAddresses.classList.toggle(`visually-hidden`, false);
    form.classList.toggle(`visually-hidden`, true);
  } else {
    pickupAddresses.classList.toggle(`visually-hidden`, true);
    form.classList.toggle(`visually-hidden`, false);
  }
});

form.addEventListener(`input`, () => {
  const nameSample = /^[а-яА-ЯёЁ -]{1,50}$/u;
  const addressSample = /^.{1,100}$/u;

  let mistakes = [];

  checkInputValidity(mistakes, username, nameSample, `Скажи, как зовут то ?)`);
  checkInputValidity(mistakes, address, addressSample, `Спорим, угадаю где живешь ?)`);

  if (mistakes.includes(false) && !buttonForm.hasAttribute(`disabled`)) {
    buttonForm.setAttribute(`disabled`, `disabled`);
  } else if (!mistakes.includes(false)) {
    buttonForm.removeAttribute(`disabled`);
  }
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  form.reset();

  const phoneElement = document.querySelectorAll(`.form-control`)[1];
  phoneElement.querySelector(`p`).style.visibility = `hidden`;
  phoneElement.querySelector(`svg`).style.visibility = `hidden`;
});

window.addEventListener(`mapWasLoaded`, () => {
  window.ymaps.ready(init);
});

pointsList.addEventListener(`change`, (evt) => {
  const checkedPointsSet = new Set(checkedPoints);

  if (evt.target.checked) {
    checkedPointsSet.add(evt.target.value);
  } else {
    checkedPointsSet.delete(evt.target.value);
  }

  checkedPoints = [...checkedPointsSet];

  if (checkedPoints.length === 0 && !buttonMap.hasAttribute(`disabled`)) {
    buttonMap.setAttribute(`disabled`, `disabled`);
  } else {
    buttonMap.removeAttribute(`disabled`);
  }

  myMap.geoObjects.removeAll();

  for (let i = 0; i < checkedPoints.length; i++) {
    myMap.geoObjects
        .add(new window.ymaps.Placemark(pickupPoints[checkedPoints[i]][1], {
          balloonContent: `${pickupPoints[checkedPoints[i]][0]}`
        }, {
          iconLayout: `default#image`,
          iconImageHref: `img/icon-pickup-point.svg`,
          iconImageSize: [33.33, 40],
          iconImageOffset: [-16.66, -40],
        }));
  }
});

function init() {
  myMap = new window.ymaps.Map(`YMapsID`, {
    center: [55.982700, 37.140552],
    zoom: 13,
  }, {
    searchControlProvider: `yandex#search`
  });
}

function checkInputValidity(mistakes, inputName, sample, message) {
  const value = inputName.value.trim();

  if (!sample.test(value)) {
    inputName.setCustomValidity(message);
    mistakes.push(false);

  } else {
    inputName.setCustomValidity(``);
  }
}


window.$(form).validate({
  rules: {
    phone: {
      checkMask: true
    }
  }
});

