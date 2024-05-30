import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._deleteSubmit = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._deleteSubmitConfirmText = this._deleteSubmit.textContent;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  deleting = (deleting, deletingText = "Deleting...") => {
    if (deleting) {
      this._deleteSubmit.textContent = deletingText;
    } else {
      this._deleteSubmit.textContent = this._deleteSubmitConfirmText;
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}
