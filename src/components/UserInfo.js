export default class UserInfo {
  constructor(nameElement, jobElement) {
    this._displayName = nameElement;
    this._displayDescription = jobElement;
  }

  getUserInfo() {
    return {
      name: this._displayName.textContent,
      description: this._displayDescription.textContent.trim(),
    };
  }

  setUserInfo(userName, userDescription) {
    this._displayName.textContent = userName;
    this._displayDescription.textContent = userDescription;
  }
}
