import { Component } from './Component.js';
import { GameGrid, ShareButton, ModalView, GameClock } from './index.js';
import { Game } from '../js/Game.js';

export class AppComponent extends Component {
  constructor() {
    super('app', {
      templateName: 'app',
      elementProperties: {},
      components: {
        'share-button': ShareButton,
        'game-grid': GameGrid,
        // 'score-board': ,
        'modal-view': ModalView,
        'game-clock': GameClock,
      }
    });

    this.game = new Game(this.gameGrid.dom);

  }

// get gameGrid() { return this.components['game-grid'] }
// get clock() { return this.components['game-clock'] }
// get shareButton() { return this.components['share-button'] }
}