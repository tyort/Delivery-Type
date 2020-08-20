(function () {
  'use strict';

  const blockItem = Array.from(document.querySelectorAll(`.block__item`));
  const readyAnswers = new Map();

  const firstBlock = document.querySelector(`.first-block`);
  const firstBlockToMap = new Map();
  const secondBlock = document.querySelector(`.second-block`);
  const secondBlockToMap = new Map();
  const thirdBlock = document.querySelector(`.third-block`);
  const thirdBlockToMap = new Map();
  const fourthBlock = document.querySelector(`.fourth-block`);
  const fourthBlockToMap = new Map();
  const fifthBlock = document.querySelector(`.fifth-block`);
  const fifthBlockToMap = new Map();
  const sixthBlock = document.querySelector(`.sixth-block`);
  const sixthBlockToMap = new Map();

  const button = document.querySelector(`.send-answers__btn`);

  for (let i = 0; i < blockItem.length; ++i) {
    blockItem[i].addEventListener(`change`, (evt) => {
      readyAnswers.set(evt.target.name, evt.target.value);
      if (readyAnswers.size === 5) {
        button.removeAttribute(`disabled`);
      }
    });
  }

  getAnswersOfBlock(firstBlock, firstBlockToMap);
  getAnswersOfBlock(secondBlock, secondBlockToMap);
  getAnswersOfBlock(thirdBlock, thirdBlockToMap);
  getAnswersOfBlock(fourthBlock, fourthBlockToMap);
  getAnswersOfBlock(fifthBlock, fifthBlockToMap);
  getAnswersOfBlock(sixthBlock, sixthBlockToMap);

  button.addEventListener(`click`, () => {
    isElementShowing(`first-block`, `type-visual`);
    isElementShowing(`second-block`, `type-logic`);
    isElementShowing(`third-block`, `type-verbal`);
    isElementShowing(`fourth-block`, `type-audio`);
    isElementShowing(`fifth-block`, `type-physic`);
    document.querySelector(`.type-description`).classList.remove(`visually-hidden`);
    document.querySelector(`.type-social`).classList.remove(`visually-hidden`);
    document.querySelector(`.page-content`).classList.add(`visually-hidden`);
  });

  function getAnswersOfBlock(numberOfBlock, mapOfBlock) {
    numberOfBlock.addEventListener(`change`, (evt) => {
      mapOfBlock.set(evt.target.name, evt.target.value);
      const firstBlockValues = [...mapOfBlock.values()];

      numberOfBlock.querySelector(`.total__result`)
          .querySelector(`input`).value = firstBlockValues.filter((it) => it === `yes`).length;

      if (mapOfBlock.size === 5) {
        numberOfBlock.classList.add(`completed`);

        if (firstBlockValues.filter((it) => it === `yes`).length > 2) {
          numberOfBlock.classList.toggle(`must-show`, true);
        } else {
          numberOfBlock.classList.toggle(`must-show`, false);
        }
      }
    });
  }

  function isElementShowing(classOfAnswer, classOfResult) {
    if (document.querySelector(`.${classOfAnswer}`).classList.contains(`must-show`)) {
      document.querySelector(`.${classOfResult}`).classList.remove(`visually-hidden`);
    }
  }

}());

//# sourceMappingURL=main.js.map
