import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";

/**API */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4f0e60af-a517-4551-bd96-a987f4d48fa8",
    "Content-Type": "application/json",
  },
});

/**Page Elements */

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
const deleteCardModal = document.querySelector("#delete-card-modal");
const imageModal = document.querySelector("#image-preview");
const avatarEditModal = document.querySelector("#avatar-edit-modal");
const avatarEditButton = document.querySelector("#profile-image-button");
const avatarEditForm = avatarEditModal.querySelector(".modal__form");
const avatar = document.querySelector(".profile__image");

/** Load */
const userInfo = new UserInfo(profileTitle, profileDescription, avatar);
let cardSection;

api.getAppInfo().then(([cards, user]) => {
  cardSection = new Section(
    {
      renderer: renderCard,
      items: cards,
    },
    selectors.cardSection
  );
  cardSection.renderItems();
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setAvatar(user.avatar);
});

/** Profile */

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});

const editProfilePopup = new PopupWithForm(profileEditModal, (data) => {
  editProfilePopup.saving(true);
  api.updateUserInfo(data).then((data) => {
    userInfo.setUserInfo(data.name, data.about);
    editProfilePopup.saving(false);
    editProfilePopup.close();
    editFormValidator.toggleButtonState();
  });
});
editProfilePopup.setEventListeners();

/** Cards */
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const renderCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  );
  cardSection.addItem(cardElement.getView());
};

const addCardPopup = new PopupWithForm(addCardModal, (data) => {
  addCardPopup.saving(true);
  api.addCard(data).then((data) => {
    addCardPopup.saving(false);
    renderCard(data);
    addCardPopup.close();
    addFormValidator.toggleButtonState();
  });
});
addCardPopup.setEventListeners();

/** Image */

function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

const previewImagePopup = new PopupWithImage(imageModal, handleImageClick);
previewImagePopup.setEventListeners();

/** Likes */
function handleLikeClick(card) {
  if (card.isLiked) {
    api.removeLike(card._id).then(() => {
      card.handleLikeButton();
    });
  } else {
    api.likeCard(card._id).then(() => {
      card.handleLikeButton();
    });
  }
}

/** Delete */

const deleteCardPopup = new PopupWithConfirm(deleteCardModal);
deleteCardPopup.setEventListeners();

function handleDeleteClick(card) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitAction(() => {
    deleteCardPopup.deleting(true);
    api.deleteCard(card._id).then(() => {
      deleteCardPopup.deleting(false);
      card.removeCard();
      deleteCardPopup.close();
    });
  });
}

/** Avatar */

avatarEditButton.addEventListener("click", () => {
  editAvatarPopup.open();
});

const editAvatarPopup = new PopupWithForm(avatarEditModal, (data) => {
  editAvatarPopup.saving(true);
  api.setUserAvatar(data).then((data) => {
    editAvatarPopup.saving(false);
    userInfo.setAvatar(data.avatar);
    editAvatarPopup.close();
    avatarFormValidator.toggleButtonState();
  });
});
editAvatarPopup.setEventListeners();

// /**Form Validation */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarEditForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
editFormValidator.toggleButtonState();
addFormValidator.toggleButtonState();
avatarFormValidator.toggleButtonState();
