import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import { EventEmitter } from 'https://hamilsauce.github.io/hamhelper/event-emitter.js';
const { template, DOM, utils, text } = ham;

export const ElementProperties = {
  id: String,
  classList: Array,
  dataset: Object,
}

export const ComponentOptions = {
  templateName: 'map',
  elementProperties: ElementProperties,
  children: [],
  components: {},
}

export class Component extends EventEmitter {
  #self;
  #name;
  components = {};

  constructor(name, options = ComponentOptions) {
    super();

    if (!name) throw new Error('No name passed to constructor for ', this.constructor.name);

    if (options && options !== ComponentOptions) {
      this.#self = DOM.createElement(options);

      this.components = options.components || this.components;
    }

    else this.#self = Component.#getTemplate(name);

    if (!this.#self) throw new Error('Failed to find/load a Component class template. Class/template name: ' + name);

    this.#name = name;

    this.dataset.id = Component.uuid(name);

    this.parseTemplate();
  }

  get self() { return this.#self };

  get dataset() { return this.self.dataset };

  get textContent() { return this.self.textContent };

  set textContent(v) { this.dom.textContent = v }

  get id() { return this.#self.id };

  get dom() { return this.#self };

  get name() { return this.#name };

  static #getTemplate(name) {
    return template(name);
  }

  static uuid(name) {
    return (name.slice(0, 1).toLowerCase() || 'o') + utils.uuid();
  }

  parseTemplate() {
    /*
      [ ] Find and init data-bindings
     
      [X] Find and instantiate child comps
    */

    this.dom.querySelectorAll('[data-component-ref]').forEach((el, i) => {

      if (!el || !this.components[el.dataset.componentRef]) return;

      const componentName = el.dataset.componentRef;

      this.component(componentName, el);
    });
  }

  component(componentName, el) {
    if (!this.components[componentName]) return console.error('COMPONENT NOT REGISTERED: ' + `${ JSON.stringify({parent: this.constructor.name, componentName}) }`);

    const name = text.kebabToCamel(componentName);

    this[name] = new this.components[componentName]();

    el.replaceWith(this[name].dom);
  }

  create() {
    throw 'Must define create in child class of Component. Cannot call create on Component Class. '
  }

  init(options) {
    throw 'Must define init in child class of Component. Cannot call create on Component Class. '
  }

  selectDOM(selector) {
    const result = [...this.#self.querySelectorAll(selector)];

    return result.length === 1 ? result[0] : result;
  }
};