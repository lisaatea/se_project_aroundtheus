import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".modal__image");
    this._imageTitle = this._popupElement.querySelector(".modal__caption");
  }

  open(name, link) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._imageTitle.textContent = name;
  }
}
