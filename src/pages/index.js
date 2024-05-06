import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  selectors,
  validationSettings,
} from "../utils/constants.js";

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileTitle = document.querySelector("#profile-title");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileDescription = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const imageModal = document.querySelector("#image-preview");

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});

const renderCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick
  );
  cardSection.addItem(cardElement.getView());
};

function handleAddCardSubmit(data) {
  renderCard(data);
  addCardPopup.close();
  addFormValidator.toggleButtonState();
}

function handleEditProfileSubmit(data) {
  userInfo.setUserInfo(data);
  editProfilePopup.close();
  editFormValidator.toggleButtonState();
}

function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

const cardSection = new Section(
  {
    renderer: renderCard,
    items: initialCards,
  },
  selectors.cardSection
);

cardSection.renderItems();

const addCardPopup = new PopupWithForm(addCardModal, handleAddCardSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  profileEditModal,
  handleEditProfileSubmit
);
editProfilePopup.setEventListeners();

const previewImagePopup = new PopupWithImage(imageModal, handleImageClick);
previewImagePopup.setEventListeners();

const userInfo = new UserInfo(profileTitle, profileDescription);

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormValidator.toggleButtonState();
addFormValidator.toggleButtonState();
