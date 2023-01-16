import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;

export class Card {
  constructor(className, cardSymbol, eventHandler) {
    this.className = className;
    this.cardSymbol = cardSymbol;
    this.sharedClassName = 'grid-cell';
    this.eventHandler = eventHandler;
    this.isSelected = false;
    // console.warn('Card', this)
  }

  static getSymbol(symbol) { return template(`${symbol}-symbol`) }

  // set cardSymbol(v) {
  //   if (!v) return;

  // }

  render() {
    const card = template('card');
    const symb = Card.getSymbol(this.cardSymbol);
    
    card.querySelector('.card-content').append(symb);
    card.classList.add(`${this.className}`, 'grid-cell', 'card');
    card.id = this.className;

    card.addEventListener('click', this.eventHandler);

    return card;
  }

  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  toggleMatched() {
    this.matched = !this.matched;
  }
}
