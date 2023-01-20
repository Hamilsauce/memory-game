import { SYMBOL_NAMES } from './symbols.js';
import { Deck } from './Deck.js';
import { Card } from '../components/card.component.js';
import { AppComponent } from '../components/app.component.js';
import { ShareButton } from '../components/share-button.component.js';
import { GameGrid } from '../components/game-grid.component.js';
import { ModalView } from '../components/modal.js';
import { GameClock } from './gameClock.js';
import { Game } from './Game.js';
import { settingsAlert } from './settings.js';
import { initializeFirebase } from '../firebase/firebase.js';


export class Pair {
  #limit = 2
  #items = new Array(2);

  constructor(matcherFn) {}

  static create(itemA, itemB, matcherFn = (a, b) => a === b) {
    if (!(itemA && itemB)) return console.error('Need two items passed to Pair.set');



    this.#items.push(itemA, itemB);

    return this.size;
  }

  add(item) {
    if (!this.isFull) {
      this.#items.push(item);
    }

    return this.size;
  }

  clear() {
    const [first, second] = this.#items;

    this.#items = [];

    return [first, second];
  }

  get first() { return this.#items[0] || null };

  get second() { return this.#items[1] || null };

  get size() { return this.#items.length };

  get isFull() { return this.#items.length >= this.#limit };
}


initializeFirebase();

// const userform = document.querySelector('.userform');

let prevTarget;

const app = new AppComponent();
const CardPair = new Pair();

document.querySelector('[data-component-ref="app"]').replaceWith(app.dom)

document.addEventListener('user:action', e => {
  const { action } = e.detail;

  if (action === 'newgame') newGame();
});

function handleCardSelect(event) {
  const targ = event.target.closest('.card')

  const selectCard = (cardDOM) => { //adds clicked card to selected array
    cardDOM.classList.add('selected');
    app.game.selected.push(cardDOM);
  }


  // TEMP
  let card = targ;

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
const checkSelected = cardPair => {
  let deckCheck;

  console.log({ ...cardPair });

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

const cardMaker = (cSymbol) => {
  const cardClass = `cell${cSymbol}`;
  const newCard = new Card(cardClass, cSymbol, handleCardSelect);

  return newCard;
}

//@
//@ End of game functions
//@

const buildDeck = cardSymbols => { //! takes array of SYMBOL_NAMES, calls cardMaker on each, then adds each to game.deck. deck then duplicates to create matches
  cardSymbols.forEach(symbol => {
    app.game.deck.insertCard(cardMaker(symbol, 'game-grid'), 0);
    app.game.deck.insertCard(cardMaker(symbol, 'game-grid'), 1);
  });

  app.game.deck.createMatchingCards();
}

const newGame = () => {
  document.querySelector('#game-grid').innerHTML = '';

  app.game.resetGame();

  buildDeck(SYMBOL_NAMES);

  app.game.deck.shuffle();

  app.game.setBoard();

  app.gameClock.start(document.querySelector('.time-counter'));
}

//TODO move into a module for UI updates (modal module maybe)
const displayStats = () => {
  const historyDisplay = document.querySelector('.gameHistoryDisplay');
  const nameDisplay = document.querySelector('.playerName');
  const starsDisplay = document.querySelector('.starsDisplay');
  const turnScore = document.querySelector('.turnScore');
  const timeScore = document.querySelector('.timeScore');

  historyDisplay.textContent = `Total Games ${app.game.gameHistory.length}`;
  nameDisplay.textContent = `Player: ${app.game.playerName}`;
  starsDisplay.textContent = app.game.stars;
  turnScore.textContent = app.game.turns;
  timeScore.textContent = app.game.gameTime;
}

const endGame = () => {
  const endModal = document.querySelector('.endModal');
  app.modalView.setActiveModal('end');
  app.modalView.toggleShow()

  app.game.gameTime = app.gameClock.finalTime;

  app.game.gameOver();

  displayStats();

  document.querySelector('#game-grid').innerHTML = '';

  document.querySelector('.turns-counter').innerHTML = '0';

  setTimeout(() => {
    app.modalView.show = true;
  }, 300);
}

setTimeout(() => {
  //@ Eventlisteners!!
  document.querySelector('.modalTop').addEventListener('click', (e) => { //!gamehistory
    setTimeout(() => {
      parent.location = './gameLobby.html';
    }, 750);
  });

  document.querySelector('.modalBottom').addEventListener('click', (e) => { //!settings button
    setTimeout(() => {
      settingsAlert();
    }, 750);
  });

  // TODO Put sharebutton in module
}, 1000)


function showMessage(element, msg) {
  const shareButton = document.querySelector('.shareButton');

  element.textContent = msg;

  setTimeout(() => {
    shareButton.innerHTML = buttonContent;
  }, 2000);
}