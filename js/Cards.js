import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export class Card {
  constructor(className, cardSymbol, eventHandler) {
    this.className = className;
    this.cardSymbol = cardSymbol;
    this.sharedClassName = 'grid-cell';
    this.eventHandler = eventHandler;
    this.isSelected = false;

  }

  static getSymbol(symbol) { return template(`${symbol}-symbol`) }

  // set cardSymbol(v) {
  //   if (!v) return;

  // }

  render() {
    const card = template('card');
    const symb = Card.getSymbol(this.cardSymbol);
    card.querySelector('.card-content').append(symb)
    card.classList.add(`${this.className}`, 'grid-cell', 'card');
    card.id = this.className

    card.addEventListener('click', this.eventHandler);
    return card
    const cardEl = document.createElement('div');
    const cardText = document.createTextNode(this.cardSymbol);

    cardEl.appendChild(cardText);
    console.log(cardEl);
    return cardEl;
  }

  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  toggleMatched() {
    this.matched = !this.matched;
  }
}

export class Deck {
  constructor() {
    this.cards = [];
    this.deckSize = 0;
  }

  updateDeckSize() {
    this.deckSize = this.cards.length;
    return this.deckSize;
  }

  createMatchingCards() {
    this.cards = this.cards.reduce((result, curr) => result.concat([curr, curr]), []);

    this.updateDeckSize();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  generateCard(card) {
    this.cards.push(card);
    this.updateDeckSize();
  }
}
