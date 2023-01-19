import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class Card extends Component {
  constructor(cardName, cardSymbol, eventHandler) {
    super('card', {
      templateName: 'card',
      elementProperties: {
        id: cardName,
        classList: ['card', 'grid-cell', cardName],
        data: {
          selected: false,
          matched: false,
          symbol: cardSymbol
        },
        // onclick: eventHandler,
      },
    });

    this.eventHandler = eventHandler;
    this.cardName = cardName;
    this.cardSymbol = cardSymbol;
    this.isSelected = false;
  }

  get selected() {
    return this.dataset.selected === 'true' ? true : false;
  }

  static getSymbol(symbol) { return template(`${symbol}-symbol`) }

  render() {
    const card = template('card');
    const symb = Card.getSymbol(this.cardSymbol);

    card.querySelector('.card-content').append(symb);
    card.classList.add(`${this.cardName}`, 'grid-cell', 'card');
    card.id = this.cardName;

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