import { SYMBOL_NAMES } from '../js/symbols.js';

console.log({ SYMBOL_NAMES });
// const duped = [...SYMBOL_NAMES, ...SYMBOL_NAMES];
// console.log('duped', duped)

export class Deck {
  cardSymbols = [];

  constructor() {
    this.cards = [];

    setTimeout(() => {
      console.log('this.cards id', this.cards);
    }, 3000)
  }

  get deckSize() { return this.cards.length; }

  setDeck(matchSetSize = 2, cardSymbols = []) {
    this.cardSymbols = [];

    for (var i = 0; i < Things.length; i++) {
      this.cardSymbols = [...this.cardSymbols, ...cardSymbols];
    }

    return this.deckSize;
  }

  createMatchingCards() {
    this.cards = this.cards.reduce((result, curr) => [...result].concat([curr]), []);
  }

  shuffle() {
    this.cards = [...this.cards];

    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }

    return this;
  }

  insertCard(card) {
    this.cards.push(card);
  }
}