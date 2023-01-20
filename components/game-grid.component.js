import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class GameGrid extends Component {
  constructor() {
    super('game-grid', {
      templateName: 'game-grid',
      elementProperties: {},
    });
  }

  handleCardSelect(event) {
    const card = event.target.closest('.card')

    const selectCard = (card) => { //adds clicked card to selected array
      card.classList.add('selected');
      app.game.selected.push(card);
    }




    if (card === prevTarget && card.classList.contains('selected')) { //! Tests if card already selected, deselects if so
      card.classList.remove('selected');
      app.game.selected.splice(app.game.selected.indexOf(card), 1);
      prevTarget = '';
    } else if (app.game.selected.length === 0 && card !== prevTarget) { //! tests if selected card is first or second selection, if first just adds to array
      selectCard(card);
      prevTarget = card;
    } else if (app.game.selected.length === 1 && card !== prevTarget) { //! if card is not 1st selected and not already selectd, test for matching SYMBOL_NAMES
      selectCard(card);
      checkSelected(app.game.selected);
      prevTarget = card;
    } else if (app.game.selected.length === 2) { //! this shouldnt happen
      checkSelected(app.game.selected);
      prevTarget = card;
    }
  }

  //* Manages general card and card array states
  checkSelected = cardPair => {
    let deckCheck;

    if (cardPair[0].id === cardPair[1].id) { //! a match is made!
      cardPair.forEach(card => {

        // Timeout used for transition delay
        setTimeout(() => {
          card.classList.remove('selected');
          card.classList.add('matched');
        }, 1000);

        card.removeEventListener('click', handleCardSelect);

        const cardIndex = app.game.deck.cards //! get index of card object wtih matching symbol as that of clicked card div
          .findIndex(cardObj => {
            return card.id = cardObj.className
          });

        const matchedCard = app.game.deck.cards.splice(cardIndex, 1); //! move said card to matched array (out of deck)

        matchedCard.isMatched = true;

        app.game.matched.push(matchedCard);

        //!after each match is made, test if deck is depleted/game over or not
        deckCheck = app.game.deck.cards.length == 0 ? 'allCardsMatched' : '';
      });

    } else { //! if no match, jsut remove the selected class (puts it back into play)
      cardPair.forEach(card => {
        setTimeout(() => {
          card.classList.remove('selected');
        }, 600);
      });
    }

    app.game.selected.length = 0;

    document.querySelector('.turns-counter').innerHTML = app.game.addTurn();

    if (deckCheck === 'allCardsMatched') { //! checks if all cards have been matched, initiates end game if so
      app.gameClock.stop();

      setTimeout(() => {
        endGame();
      }, 1500);
    };
  }

  cardMaker = (cSymbol) => {
    const cardClass = `cell${cSymbol}`;
    const newCard = new Card(cardClass, cSymbol, handleCardSelect);

    app.game.countCard();

    return newCard;
  }
}