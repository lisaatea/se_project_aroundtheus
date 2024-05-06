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

  setUserInfo(data) {
    this._displayName.textContent = data.name;
    this._displayDescription.textContent = data.description;
  }
}
