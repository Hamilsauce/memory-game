import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { template, utils } = ham;
import { Component } from './Component.js';

export class ModalView extends Component {
  constructor(defaultModal = 'options') {
    super('modal-view', {
      templateName: 'modal-view',
      elementProperties: {
        data: {
          show: true,
          activeModal: null,
        }
      },
    });

    this.modals = new Map([
      ['options', template('options-modal')],
      ['end', template('end-modal')],
    ]);

    this.setActiveModal(defaultModal);

    this.clickHandler = this.handleButtonClick.bind(this);

    this.dom.addEventListener('click', this.clickHandler);
  }

  get activeModalContainer() { return this.selectDOM('#active-modal-container'); }

  get activeModal() { return this.activeModalContainer.firstElementChild; }

  get show() { return this.dataset.show; }

  set show(v) { this.dataset.show = v == true ? true : false; }

  setActiveModal(name) {
    if (this.activeModal) {
      this.activeModal.replaceWith(this.modals.get(name))
    }

    else this.activeModalContainer.append(this.modals.get(name))
  }

  toggleShow() {
    this.show = !this.show;
  }

  handleButtonClick(e) {
    const targ = e.target.closest('[data-modal-button]');
    if (targ) {
      const action = targ.dataset.action;

      if (action === 'done') {
        this.setActiveModal('options');

        return;
      }

      this.dom.dispatchEvent(new CustomEvent('user:action', { bubbles: true, detail: { action } }))

      if (action === 'newgame') {
        this.show = false;
      }
    }
  }
}