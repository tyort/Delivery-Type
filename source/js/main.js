const pageHeader = document.querySelector(`.page-header`);
const pageHeaderMenuIcon = pageHeader.querySelector(`.page-header__menu-icon`);
const headerLogo = pageHeader.querySelector(`.page-header__logo-image`);
const agreement = document.querySelector(`.field-agreement`).querySelector(`input`);
const btn = document.querySelector(`.page-booking__form`).querySelector(`button`);
const form = document.querySelector(`.page-booking__form`);

document.addEventListener(`DOMContentLoaded`, () => {
  pageHeader.classList.add(`page-header--js-active`);
  pageHeader.querySelector(`.page-header__menu-icon`).classList.toggle(`visually-hidden`, false);
});

pageHeaderMenuIcon.addEventListener(`click`, function () {
  document.addEventListener(`keydown`, onEscKeyDown);
  setTimeout(() => (headerLogo.style.fill = `#011C40`), 200);
  document.querySelector(`body`).style.overflow = `hidden`;

  if (pageHeaderMenuIcon.querySelector(`.menu-icon-lines`).classList.contains(`lines__active`)) {
    document.removeEventListener(`keydown`, onEscKeyDown);
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
    document.querySelector(`body`).style.overflow = `visible`;
  }

  pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`);
  pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`);
});

window.addEventListener(`resize`, () => {
  if (window.innerWidth >= 728) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.querySelector(`body`).style.overflow = `visible`;
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
  }
});

function onEscKeyDown(evt) {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    pageHeader.querySelector(`.main-navigation`).classList.toggle(`navigation-active`, false);
    pageHeader.querySelector(`.menu-icon-lines`).classList.toggle(`lines__active`, false);
    document.removeEventListener(`keydown`, onEscKeyDown);
    document.querySelector(`body`).style.overflow = `visible`;
    setTimeout(() => (headerLogo.style.fill = `#F9FBFD`), 200);
  }
}

form.addEventListener(`input`, (evt) => {
  const phoneSample = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const mailSample = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
  const nameSample = /^[a-zA-Zа-яёА-ЯЁ]+$/u;

  if (evt.target.className === `field-phone`) {
    if (!phoneSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши номер правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }

  } else if (evt.target.className === `field-email`) {
    if (!mailSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши email правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  } else if (evt.target.className === `field-name`) {
    if (!nameSample.test(evt.target.value)) {
      evt.target.setCustomValidity(`Напиши ФИО правильно`);

    } else {
      evt.target.setCustomValidity(``);
    }
  }
});

agreement.addEventListener(`change`, (evt) => {
  if (evt.target.checked) {
    btn.removeAttribute(`disabled`);
    return;
  }
  btn.setAttribute(`disabled`, `disabled`);
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
    iconImageHref: `img/icon-map-marker.svg`,
    iconImageSize: [18, 22],
    iconImageOffset: [-9, -22],
  });

  myMap.geoObjects
      .add(myPlacemark);
}


const blockItem = document.querySelectorAll(`.block__item`)
const readyAnswers = new Map();
const firstBlock = document.querySelector(`.first-block`).querySelectorAll(`.block__item`);
const secondBlock = document.querySelector(`.second-block`).querySelectorAll(`.block__item`);
const thirdBlock = document.querySelector(`.third-block`).querySelectorAll(`.block__item`);
const fourthBlock = document.querySelector(`.fourth-block`).querySelectorAll(`.block__item`);
const fifthBlock = document.querySelector(`.fifth-block`).querySelectorAll(`.block__item`);
const sixthBlock = document.querySelector(`.sixth-block`).querySelectorAll(`.block__item`);
const firstBlockYes = new Map();
const secondBlockYes = new Map();
const thirdBlockYes = new Map();
const fourthBlockYes = new Map();
const fifthBlockYes = new Map();
const sixthBlockYes = new Map();
let showFirstBlock = false;
let showSecondBlock = false;
let showThirdBlock = false;
let showFourthBlock = false;
let showFifthBlock = false;
let showSixthBlock = false;
for (let i = 0; i < blockItem.length; ++i) {
  blockItem[i].addEventListener(`change`, (evt) => {
    readyAnswers.set(evt.target.name, evt.target.value);
    document.querySelector(`.answers__count`).textContent = readyAnswers.size;
    console.log(readyAnswers);
    if (readyAnswers.size === 30) {
      document.querySelector(`.send-answers__btn`).removeAttribute(`disabled`)
    }
  })
}
for (let i = 0; i < firstBlock.length; ++i) {
  firstBlock[i].addEventListener(`change`, (evt) => {
    firstBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(firstBlockYes.values()).filter((it) => it === `yes`);
    showFirstBlock = yesArray.length >= 3 ? true : false;
  })
}
for (let i = 0; i < secondBlock.length; ++i) {
  secondBlock[i].addEventListener(`change`, (evt) => {
    secondBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(secondBlockYes.values()).filter((it) => it === `yes`);
    showSecondBlock = yesArray.length >= 3 ? true : false;
  })
}
for (let i = 0; i < thirdBlock.length; ++i) {
  thirdBlock[i].addEventListener(`change`, (evt) => {
    thirdBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(thirdBlockYes.values()).filter((it) => it === `yes`);
    showThirdBlock = yesArray.length >= 3 ? true : false;
  })
}
for (let i = 0; i < fourthBlock.length; ++i) {
  fourthBlock[i].addEventListener(`change`, (evt) => {
    fourthBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(fourthBlockYes.values()).filter((it) => it === `yes`);
    showFourthBlock = yesArray.length >= 3 ? true : false;
  })
}
for (let i = 0; i < fifthBlock.length; ++i) {
  fifthBlock[i].addEventListener(`change`, (evt) => {
    fifthBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(fifthBlockYes.values()).filter((it) => it === `yes`);
    showFifthBlock = yesArray.length >= 3 ? true : false;
  })
}
for (let i = 0; i < sixthBlock.length; ++i) {
  sixthBlock[i].addEventListener(`change`, (evt) => {
    sixthBlockYes.set(evt.target.name, evt.target.value);
    const yesArray = Array.from(sixthBlockYes.values()).filter((it) => it === `yes`);
    showSixthBlock = yesArray.length >= 3 ? true : false;
  })
}

document.querySelector(`.send-answers__btn`).addEventListener(`click`, () => {
  if (showFirstBlock) {
    document.querySelector(`.type-visual`).classList.toggle(`visually-hidden`, false);
  }
  if (showSecondBlock) {
    document.querySelector(`.type-logic`).classList.toggle(`visually-hidden`, false);
  }
  if (showThirdBlock) {
    document.querySelector(`.type-verbal`).classList.toggle(`visually-hidden`, false);
  }
  if (showFourthBlock) {
    document.querySelector(`.type-audio`).classList.toggle(`visually-hidden`, false);
  }
  if (showFifthBlock) {
    document.querySelector(`.type-physic`).classList.toggle(`visually-hidden`, false);
  }
  if (showSixthBlock) {
    document.querySelector(`.type-social`).classList.toggle(`visually-hidden`, false);
  }
})


