const CardModelOptions = {
  symbol: String,
  selected: Boolean,
  matched: Boolean,
}

export class CardModel {
  #symbol = null;
  #selected = false;
  #matched = false;

  constructor(options = CardModelOptions) {
    if (!options || !options.symbol || options === CardModelOptions) throw new Error('Invalid Card Options');

    this.#symbol = options.symbol;
  }

  select() {
    this.#selected = true;

    return this;
  }

  deselect() {
    this.#selected = false;

    return this;
  }

  setMatched() {
    this.#matched = true;

    return this;
  }

  get symbol() { return this.#symbol };

  get selected() { return this.#selected };

  get matched() { return this.#matched };
}