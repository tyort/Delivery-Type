(function () {
  'use strict';

  const pageDelivery = document.querySelector(`.page-delivery`);
  const form = pageDelivery.querySelector(`form`);
  const username = form.querySelector(`#block-name`);
  const phone = form.querySelector(`#block-phone`);
  const address = form.querySelector(`#block-address`);
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


  window.$(document).ready(() => {
    window.$(phone).mask(`+7 (999) 999-99-99`);
  });


  form.addEventListener(`input`, (evt) => {
    evt.preventDefault();

    const nameSample = /^[а-яА-ЯёЁ -]{1,50}$/u;
    const addressSample = /^.{1,100}$/u;

    checkInputValidity(username, nameSample, `Скажи, как зовут то ?)`);
    checkInputValidity(address, addressSample, `Спорим, угадаю где живешь ?)`);
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

  function checkInputValidity(inputName, sample, message) {
    const value = inputName.value.trim();

    if (!sample.test(value)) {
      inputName.setCustomValidity(message);

    } else {
      inputName.setCustomValidity(``);
    }
  }

}());

//# sourceMappingURL=main.js.map
