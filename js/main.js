import { SYMBOL_NAMES } from './symbols.js';
import { Card } from './Cards.js';
import { GameClock } from './gameClock.js';
import { Game } from './Game.js';
import { settingsAlert } from './settings.js';

const firebaseConfig = {
  apiKey: "AIzaSyDlj4rmHO_kq3Z6ya2zqgGdP0AUg2znX9I",
  authDomain: "memory-card-app.firebaseapp.com",
  databaseURL: "https://memory-card-app.firebaseio.com",
  projectId: "memory-card-app",
  storageBucket: "memory-card-app.appspot.com",
  messagingSenderId: "174804862889",
  appId: "1:174804862889:web:64474a9820dd9d87c6e6b8",
  measurementId: "G-9ENQL2QJRE"
};

firebase.initializeApp(firebaseConfig);

const userform = document.querySelector('.userform');
document.querySelector('.endModal').style.display = 'none';

let prevTarget;

const game = new Game(document.querySelector('.game-grid'));
const clock = new GameClock;

function handleCardSelect(event) { //* Handles card select state, routes cards for match testing if appropriate
  const card = event.target.closest('.card')

  const selectCard = (card) => { //adds clicked card to selected array
    card.classList.add('selected');
    game.selected.push(card);
  }

  if (card === prevTarget && card.classList.contains('selected')) { //! Tests if card already selected, deselects if so
    card.classList.remove('selected');
    game.selected.splice(game.selected.indexOf(card), 1);
    prevTarget = '';
  } else if (game.selected.length === 0 && card !== prevTarget) { //! tests if selected card is first or second selection, if first just adds to array
    selectCard(card);
    prevTarget = card;
  } else if (game.selected.length === 1 && card !== prevTarget) { //! if card is not 1st selected and not already selectd, test for matching SYMBOL_NAMES
    selectCard(card);
    checkSelected(game.selected);
    prevTarget = card;
  } else if (game.selected.length === 2) { //! this shouldnt happen
    checkSelected(game.selected);
    prevTarget = card;
  }
  console.log('card', card)
}

//* Manages general card and card array states
const checkSelected = cardPair => {
  const [card1, card2] = cardPair;
  let deckCheck;

  if (card1.textContent === card2.textContent) { //! a match is made!
    cardPair.forEach(card => {

      // Set timeout used for transition delay
      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.add('matched');
      }, 1000);

      card.removeEventListener('click', handleCardSelect);

      const cardObjIndex = game.deck.cards //! get index of card object wtih matching symbol as that of clicked card div
        .findIndex(cardObj => cardObj.cardSymbol == card.textContent);

      const matchedCard = game.deck.cards.splice(cardObjIndex, 1); //! move said card to matched array (out of deck)

      matchedCard.isMatched = true;
      game.matched.push(matchedCard);
      game.deck.updateDeckSize();

      //!after each match is made, test if deck is depleted/game over or not
      deckCheck = game.deck.cards.length == 0 ? 'allCardsMatched' : '';
    });

  } else { //! if no match, jsut remove the selected class (puts it back into play)
    cardPair.forEach(card => {
      setTimeout(() => {
        card.classList.remove('selected');
        card.classList.add('noMatch');
      }, 600);

      setTimeout(() => { //remove selected class, replace with matched. then remove event lsiteners
        card.classList.remove('noMatch');
      }, 1200);
    });
  }

  game.selected.length = 0;

  document.querySelector('.turns-counter').innerHTML = game.addTurn();

  if (deckCheck === 'allCardsMatched') { //! checks if all cards have been matched, initiates end game if so
    clock.stop();

    setTimeout(() => {
      endGame();
    }, 1500);
  };

  // console.warn(game);
}

const cardMaker = (cSymbol) => {
  const cardClass = `cell${cSymbol}`;
  const newCard = new Card(cardClass, cSymbol, handleCardSelect);

  game.countCard();

  return newCard;
}

//@
//@ End of game functions
//@

const buildDeck = cardSymbols => { //! takes array of SYMBOL_NAMES, calls cardMaker on each, then adds each to game.deck. deck then duplicates to create matches
  cardSymbols.forEach(symbol => {
    game.deck.generateCard(cardMaker(symbol, 'game-grid'));
  });

  game.deck.createMatchingCards();
}

const newGame = () => {
  document.querySelector('.game-grid').innerHTML = '';

  game.resetGame();

  buildDeck(SYMBOL_NAMES);

  game.deck.shuffle();
  game.setBoard();

  clock.start(document.querySelector('.time-counter'));
}

//TODO move into a module for UI updates (modal module maybe)
const displayStats = () => {
  const historyDisplay = document.querySelector('.gameHistoryDisplay');
  const nameDisplay = document.querySelector('.playerName');
  const starsDisplay = document.querySelector('.starsDisplay');
  const turnScore = document.querySelector('.turnScore');
  const timeScore = document.querySelector('.timeScore');

  historyDisplay.textContent = `Total Games ${game.gameHistory.length}`;
  nameDisplay.textContent = `Player: ${game.playerName}`;
  starsDisplay.textContent = game.stars;
  turnScore.textContent = game.turns;
  timeScore.textContent = game.gameTime;
}

const endGame = () => {
  const endModal = document.querySelector('.endModal');

  game.gameTime = clock.finalTime;
  game.gameOver();

  displayStats();

  document.querySelector('.game-grid').innerHTML = '';
  document.querySelector('.turns-counter').innerHTML = '0';

  setTimeout(() => {
    document.querySelector('.dimmer').style.display = 'flex';
    endModal.style.display = 'grid';
  }, 300);

  // console.warn({ game });
}

//@ Eventlisteners!!
document.querySelector('.newGameButton').addEventListener('click', e => {
  setTimeout(() => {
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('.dimmer').style.display = 'none';
  }, 300);

  newGame();
})

document.querySelector('.restartButton').addEventListener('click', (e) => {
  const endModal = document.querySelector('.endModal');

  setTimeout(() => {
    document.querySelector('.dimmer').style.display = 'none';
    endModal.style.display = 'none';
  }, 300);

  newGame();
});

document.querySelector('.stop-button').addEventListener('click', (e) => { //TODO broken, disabled for now
  setTimeout(() => {
    location.reload();
  }, 300);
});

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
document.querySelector('.shareButton').addEventListener('click', () => {
  const shareButton = document.querySelector('.shareButton');
  const title = document.querySelector('h1').textContent;
  const buttonContent = shareButton.innerHTML;
  const url =
    document.querySelector('link[rel=canonical]') &&
    document.querySelector('link[rel=canonical]').href ||
    window.location.href;

  if (navigator.share) {
    navigator.share({ title, url })
      .then(() => {})
      .catch(err => {
        alert('No built in share technology');
      });
  }
  else {
    setTimeout(() => {
      shareButton.textContent = 'Not supported by browser...';
    }, 500);
  
    setTimeout(() => {
      shareButton.innerHTML = buttonContent;
    }, 2000);
  }
});

function showMessage(element, msg) {
  const shareButton = document.querySelector('.shareButton');
  
  element.textContent = msg;
 
  setTimeout(() => {
    shareButton.innerHTML = buttonContent;
  }, 2000);
}
