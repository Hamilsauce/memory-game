import { CardModel } from './card.model.js';
import { SYMBOL_NAMES } from '../js/symbols.js';
import { Pair } from '../lib/Pair.js';

export class DeckModel {

  constructor() {
    this.cards = [];
  }

  get deckSize() { return this.cards.length; }

  createMatchingCards() {
    const c1 = this.cards[0];
    console.log('c1', c1)
    console.warn('{...c1}', { ...c1 })
    this.cards = this.cards.reduce((result, curr) => [...result].concat([curr, Object.assign(curr, {})]), []);
    console.log('deck cards', this.cards);
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