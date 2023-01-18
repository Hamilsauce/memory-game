export class Deck {
  constructor() {
    this.cards = [];
  }

  get deckSize() { return this.cards.length; }

  updateDeckSize() {
    return this.deckSize;
  }

  createMatchingCards() {
    this.cards = this.cards.reduce((result, curr) => [...result].concat([curr, curr]), []);
  }

  shuffle() {
    this.cards = [...this.cards];

    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  insertCard(card) {
    this.cards.push(card);
  }
}