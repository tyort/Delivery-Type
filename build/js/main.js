(function () {
  'use strict';

  const pageDelivery = document.querySelector(`.page-delivery`);
  const form = pageDelivery.querySelector(`form`);
  const username = form.querySelector(`#block-name`);
  const phone = form.querySelector(`#block-phone`);
  const address = form.querySelector(`#block-address`);
  const deliveryButtons = pageDelivery.querySelectorAll(`.delivery-type`);

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

  function init() {
    let myMap = new window.ymaps.Map(`YMapsID`, {
      center: [59.938635, 30.323118],
      zoom: 15,
    }, {
      searchControlProvider: `yandex#search`
    });

    const myPlacemark = new window.ymaps.Placemark([59.938635, 30.323118], {
      hintContent: `Круизы в Антарктику`,
    }, {
      iconLayout: `default#image`,
      iconImageHref: `img/icon-pickup-point.svg`,
      iconImageSize: [18, 22],
      iconImageOffset: [-9, -22],
    });

    myMap.geoObjects
        .add(myPlacemark);
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
