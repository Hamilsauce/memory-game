import { Deck } from './Deck.js';

export class Game {
  constructor(gameBoard) {
    this.gameHistory = this.getHistory();
    this.gameBoard = gameBoard;
    this.selected = [];
    this.matched = [];
    this.turns = 0;
    this.stars;
    this.playerName = '';
    this.playedOn = new Date().toDateString();
    this.playedAt = new Date().toLocaleTimeString();
    this.deck = this.newDeck();
  }

  newDeck() {
    return new Deck();
  }

  setBoard() {
    this.deck
      .shuffle()
      .cards.forEach(card => {
        this.gameBoard.append(card.render());
      })
  }


  addTurn() {
    this.turns++;
    return this.turns;
  }

  gameOver() {
    const check = this.deck.deckSize === 0;

    if (check === true) {
      this.getPlayerName();
      this.calculateStars();
      this.saveGame();
      this.getHistory();
    }

    return check;
  }

  resetGame() {
    this.turns = 0;
    this.matched = [];
    this.gameTime = '0:00';
    this.deck.length = 0;
  }

  getPlayerName() {
    const name = prompt('Enter name: ');

    this.playerName = name.length === 0 ? 'Anon' : name;
  }

  calculateStars() {
    const starsDisplay = document.querySelector('.starsDisplay');
    const perfectGame = this.matched.length / 2;
    const actualGame = this.turns;

    if (actualGame / perfectGame <= 1.7) { //* Gotta win w/in 10 turns for 3 stars
      starsDisplay.style.color = 'rgba(53, 163, 39, 0.904)';
      this.stars = 3;
    } else if (actualGame / perfectGame <= 2.17) { //* Gotta win w/in 13 turns for 2 stars
      starsDisplay.style.color = 'rgba(189, 162, 40, 0.904)';
      this.stars = 2;
    } else { //* 14+ turns and awarded 1 star
      starsDisplay.style.color = 'rgba(189, 40, 40, 0.904)';
      this.stars = 1;
    }
  }

  saveGame() {
    const gameId = this.gameHistory.length + 1;

    const newSave = {
      id: gameId,
      gameDate: this.playedOn,
      playerName: this.playerName,
      elapsedTime: this.gameTime,
      stars: this.stars,
      deckSize: this.matched.length,
      playerTurns: this.turns
    }

    console.warn({ newSave });

    firebase.database().ref("gameHistory/" + newSave.id).update(newSave);
  }

  async getHistory() {
    const snapshot = await firebase.database().ref('/gameHistory/').once('value');
    this.gameHistory = Object.values(snapshot.val())
      .sort((a, b) => {
        if (a.id > b.id) {
          return -1;
        } else if (a.id < b.id) {
          return 1;
        } else {
          return 0;
        }
      });

    sessionStorage.setItem('gameHistory', JSON.stringify(this.gameHistory));
  }
}