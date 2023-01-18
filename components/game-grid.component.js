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
}