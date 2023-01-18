// import { Card } from './Card.js';
export class Deck {
  constructor() {
    this.cards = [];
    // this.deckSize = 0;
  }

  get deckSize() { return this.cards.length; }

  updateDeckSize() {
    // this.deckSize = this.cards.length;
    return this.deckSize;
  }

  createMatchingCards() {
    this.cards = (this.cards.reduce((result, curr) => result.concat([curr, curr]), []))
    // this.shuffle()
    console.warn('this.cards', this.cards)
    // this.updateDeckSize();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  generateCard(card) {
    this.cards.push(card);
    // this.updateDeckSize();
    // console.warn('generateCard', this);
  }
}