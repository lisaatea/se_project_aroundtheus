import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._saveSubmit = this._popupElement.querySelector(".modal__save-button");
    this._saveSubmitConfirmText = this._saveSubmit.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  saving = (saving, savingText = "Saving...") => {
    if (saving) {
      this._saveSubmit.textContent = savingText;
    } else {
      this._saveSubmit.textContent = this._saveSubmitConfirmText;
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
