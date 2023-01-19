import { Component } from './Component.js';
export class GameClock extends Component {
  constructor() {
    super('game-clock', {
      templateName: 'game-clock',
      elementProperties: {},
    })
    this.seconds = 0;
    this.minutes = 0;
    this.finalTime = '';
    this.isRunning = false;
    this.timeFunction = {};
  }

  get display() { return this.selectDOM('#time-display') }

  timer() {
    this.timeFunction = setTimeout(() => {
      this.addSec();
      this.showTime(this.display);
    }, 1000);
  }

  addSec() {
    this.seconds++;

    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
    }
  }

  showTime(el) {
    el.textContent = `0${this.minutes}:${this.seconds <= 9 ? '0' + this.seconds : this.seconds}`;

    this.timer();
  }

  start(el) {
    // this.display = el;
    this.isRunning = true;

    this.timer();
  }

  stop() {
    this.finalTime = this.display.textContent;
    this.display.textContent = '0:00';

    clearTimeout(this.timeFunction);

    this.isRunning = false;
    this.seconds = 0;
    this.minutes = 0;
  }
}