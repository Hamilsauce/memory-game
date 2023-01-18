import { Component } from './Component.js';

export class AppComponent extends Component {
  constructor() {
    super('app', {
      templateName: 'app',
      elementProperties: {},
    });
  }
}