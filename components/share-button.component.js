import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class ShareButton extends Component {
  constructor() {
    super('share-button', {
      templateName: 'share-button',
      elementProperties: {},
    });

    this.dom.addEventListener('click', () => {
      const title = document.querySelector('h1').textContent;
      const buttonContent = this.innerHTML;
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
          this.textContent = 'Not supported by browser...';
        }, 500);

        setTimeout(() => {
          this.innerHTML = buttonContent;
        }, 1000);
      }
    });
  }
}