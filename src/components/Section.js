export default class Section {
  constructor({ renderer, items }, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.reverse().forEach(this._renderer);
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
