export default class Cell {
  #value;

  constructor(value) {
    this.#value = value;
  }

  get() {
    return this.#value;
  }
}
