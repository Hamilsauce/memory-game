import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class Card extends Component {
  #handleClick = null;

  constructor(cardName, cardSymbol, eventHandler) {
    super('card', {
      templateName: 'card',
      elementProperties: {
        id: cardName,
        classList: ['card'],
        dataset: {
          selected: false,
          matched: false,
          symbol: cardSymbol
        },
      },
    });

    this.#handleClick = eventHandler
    // this.#handleClick = this.#onClick.bind(this);
  }

  get content() {
    return this.selectDOM('.card-content');
  }

  get id() {
    return this.dataset.id;
  }

  get symbol() {
    return this.dataset.symbol
  }

  get isMatched() {
    return this.dataset.matched === 'true' ? true : false;
  }

  set isMatched(v) {
    this.isSelected = v === true ? false : this.isSelected;
    this.dataset.matched = v === true ? true : false;
  }

  get isSelected() {
    return this.dataset.selected === 'true' ? true : false;
  }

  set isSelected(v) {
    this.dataset.selected = v === true ? true : false;
  }

  static getSymbol(symbol) { return template(`${symbol}-symbol`) }

  matches(card) { return this !== card && this.symbol === card.symbol }

  render() {
    const card = this.dom;

    this.content.append(Card.getSymbol(this.symbol));

    card.addEventListener('click', this.#handleClick);

    return card;
  }

  toggleSelected() {
    this.isSelected = !this.isSelected;
  }

  setMatched() {
    this.matched = true;
  }

  #onClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this.emitDOM('card:selection', {
      id: this.id,
      isSelected: this.isSelected
    });
  }
}