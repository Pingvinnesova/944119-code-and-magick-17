'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var wizards = [];

for (var j = 0; j <= 3; j++) {
  wizards[j] = {
    name: WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)],
    coatColor: COAT_COLOR[Math.floor(Math.random() * COAT_COLOR.length)],
    eyesColor: EYES_COLOR[Math.floor(Math.random() * EYES_COLOR.length)]
  };
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userName = document.querySelector('.setup-user-name');
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (userName === document.activeElement) {
    return evt;
  } else if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
  return onPopupEscPress();
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireballColor = document.querySelector('.setup-fireball-wrap');
var wizardCoatHiddenInput = document.querySelector('.setup-player input[name="coat-color"]');
var wizardEyesHiddenInput = document.querySelector('.setup-player input[name="eyes-color"]');
var fireballHiddenInput = document.querySelector('.setup-fireball input[name="fireball-color"]');

var lastIndex;

var getRandomNumber = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  if (rand !== lastIndex) {
    lastIndex = rand;
    return rand;
  } else {
    return getRandomNumber(arr);
  }
};

wizardCoat.addEventListener('click', function () {
  var coatColorNumber = COAT_COLOR[getRandomNumber(COAT_COLOR)];
  wizardCoat.style.fill = coatColorNumber;
  wizardCoatHiddenInput.value = coatColorNumber;
});

wizardEyes.addEventListener('click', function () {
  var eyesColorNumber = EYES_COLOR[getRandomNumber(EYES_COLOR)];
  wizardEyes.style.fill = eyesColorNumber;
  wizardEyesHiddenInput.value = eyesColorNumber;
});

fireballColor.addEventListener('click', function () {
  var fireballColorNumber = FIREBALL_COLOR[getRandomNumber(FIREBALL_COLOR)];
  fireballColor.style.background = fireballColorNumber;
  fireballHiddenInput.value = fireballColorNumber;
});
