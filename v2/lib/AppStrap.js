import { EventEmitter } from 'https://hamilsauce.github.io/hamhelper/event-emitter.js';
import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { utils } = ham;

export const OBJECT_TYPES = new Set(['view', 'model'])

/*
  Plugins
  
  Component
  
  Mount
*/

const ComponentOptions = {
  name: String,
  components: {},
  
}

export class Component extends EventEmitter {
  components = new Map();

  constructor(name, ComponentOptions) {
    super();

    if (!name || !type || !OBJECT_TYPES.has(type)) throw new Error('Invalid or no name or type passed to constructor for ', this.constructor.name);

    this.#name = name;

    this.#id = AppObject.#uuid(name)

    this.#objectType = type;
  };

  get name() { return this.#name };

  get id() { return this.#id };

  get type() { return this.#objectType };

  static #uuid(name) {
    return `${(name || 'o').slice(0,1).toLowerCase()}${utils.uuid()}`;
  }
  
  component(name, definition) {
    this.components.set(name, definition)
  }
  
  
};