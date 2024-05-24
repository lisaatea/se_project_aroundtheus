class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeClick(this));

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick(this));

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _setLikes() {
    if (this._isLiked) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_active");
    } else {
      this._element
        .querySelector(".card__like-button")
        .classList.remove("card__like-button_active");
    }
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._setLikes();

    return this._element;
  }
}

export default Card;
