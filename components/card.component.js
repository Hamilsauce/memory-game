import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class Card extends Component {
  constructor(cardName, cardSymbol, eventHandler) {
    super('card', {
      templateName: 'card',
      elementProperties: {
        id: cardName,
        classList: ['card'],
        // classList: ['card', 'grid-cell', cardName],
        dataset: {
          selected: false,
          matched: false,
          symbol: cardSymbol
        },
      },
    });

    this.eventHandler = eventHandler;
  }

  get content() {
    return this.selectDOM('.card-content');
  }

  get symbol() {
    return this.dataset.symbol
  }

  // set symbol(v) {
  //   this.dataset.selected = v === true ? true : false;
  // }

  get isSelected() {
    return this.dataset.selected === 'true' ? true : false;
  }

  set isSelected(v) {
    this.dataset.selected = v === true ? true : false;
  }

  static getSymbol(symbol) { return template(`${symbol}-symbol`) }

  matches(card) { return card.symbol === this.symbol }

  render() {
    const card = this.dom;

    const symb = Card.getSymbol(this.symbol);

    this.content.append(symb);

    // card.classList.add(`${this.cardName}`, 'grid-cell', 'card');
    // card.classList.add('card');

    // card.id = this.cardName;

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