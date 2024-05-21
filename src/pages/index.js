import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import { selectors, validationSettings } from "../utils/constants.js";
import Api from "../components/Api.js";

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
const deleteCardButton = document.querySelector("#card-delete-button");
const imageModal = document.querySelector("#image-preview");

/**Page load */
const userInfo = new UserInfo(profileTitle, profileDescription);
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
});

/**Profile edit */

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});

const editProfilePopup = new PopupWithForm(profileEditModal, (data) => {
  api.updateUserInfo(data).then((data) => {
    userInfo.setUserInfo(data);
    editProfilePopup.close();
    editFormValidator.toggleButtonState();
  });
});
editProfilePopup.setEventListeners();

/**Cards*/
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

const renderCard = (cardData) => {
  const cardElement = new Card(
    cardData,
    selectors.cardTemplate,
    handleImageClick,
    handleDeleteClick
    // handleLikeClick
  );
  cardSection.addItem(cardElement.getView());
};

const addCardPopup = new PopupWithForm(addCardModal, (data) => {
  api.addCard(data).then((data) => {
    renderCard(data);
    addCardPopup.close();
    addFormValidator.toggleButtonState();
  });
});
addCardPopup.setEventListeners();

/**Image popup */

function handleImageClick(name, link) {
  previewImagePopup.open(name, link);
}

const previewImagePopup = new PopupWithImage(imageModal, handleImageClick);
previewImagePopup.setEventListeners();

/**Like function */
// function handleLikeClick()

/**Delete confirm */

// function handleDeleteClick() {
//   const id = cardElement.getId();
//   api.deleteCard(id).then((res) => {
//     cardElement.handleDeleteButton;
//   });
// }
// deleteCardButton.addEventListener("click", () => {
//   deleteCardModal.open();
// });

// const deleteCardPopup = new PopupWithConfirm(deleteCardModal, (data) => {
//   api.deleteCard(data).then(() => {
//     deleteCardPopup.close();
//   });
// });
// deleteCardPopup.setEventListeners();

// /**Form Validation */

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
editFormValidator.toggleButtonState();
addFormValidator.toggleButtonState();
