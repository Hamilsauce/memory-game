export class GameClock {
  constructor() {
    this.seconds = 55;
    this.minutes = 0;
    this.display = null;
    this.finalTime = '';
    this.isRunning = false;
    this.timeFunction = {};
  }

  timer() {
    this.timeFunction = setTimeout(() => {
      this.addSec();
      this.showTime(this.display);
      console.log('this.display', this.display)
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
    this.display = el;
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