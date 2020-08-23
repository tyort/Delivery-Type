const pageDelivery = document.querySelector(`.page-delivery`);
const form = pageDelivery.querySelector(`form`);
const button = pageDelivery.querySelector(`button[type="submit"]`);
const pickupAddresses = pageDelivery.querySelector(`.delivery-feature--addresses`);
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

deliveryTypes.addEventListener(`click`, (evt) => {
  if (evt.target.textContent === `Самовывоз`) {
    pickupAddresses.classList.toggle(`visually-hidden`, false);
    form.classList.toggle(`visually-hidden`, true);
  } else {
    pickupAddresses.classList.toggle(`visually-hidden`, true);
    form.classList.toggle(`visually-hidden`, false);
  }
});

window.$(document).ready(() => {
  window.$(phone).mask(`+7 (999) 999-99-99`);
});

form.addEventListener(`input`, () => {
  const nameSample = /^[а-яА-ЯёЁ -]{1,50}$/u;
  const addressSample = /^.{1,100}$/u;

  let sdfsdfdsf = [];

  checkInputValidity(sdfsdfdsf, username, nameSample, `Скажи, как зовут то ?)`);
  checkInputValidity(sdfsdfdsf, address, addressSample, `Спорим, угадаю где живешь ?)`);

  if (sdfsdfdsf.includes(false) && !button.hasAttribute(`disabled`)) {
    button.setAttribute(`disabled`, `disabled`);
  } else if (!sdfsdfdsf.includes(false)) {
    button.removeAttribute(`disabled`);
  }
});

form.addEventListener(`submit`, (evt) => {
  evt.preventDefault();
  form.reset();
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


