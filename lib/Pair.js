export class Pair {
  #limit = 2
  #items = new Set();
  #matcherFn = null;

  constructor(a, b) {
    this.#items.add(a)
    this.#items.add(b);
    
    if (!this.isFull) throw new Error('PAIR MUST HAVE 2 ITEMS');
  }

  get first() { return this.items[0] || null };

  get second() { return this.items[1] || null };

  get size() { return this.#items.size };

  get items() { return [...this.#items.values()] };

  get isFull() { return this.#items.size > 2 };

  static create(a, b, matcherFn) {
    if (!(items)) return console.error('Need two items passed to Pair.set');

    const p = new Pair(a, b, matcherFn || ((a, b) => a === b));

    return p;
  }

  which(callback = (item) => true) {
    return this.items.find(callback);
  }

  either(callback = (item) => null) {
    return this.items.some(callback);
  }

  both(callback = (item) => true) {
    return this.items.every(callback);
  }

  each(callback = (item) => undefined) {
    this.items.forEach((item, i) => {
      callback(item);
    });
  }

  has(item) {
    return this.#items.has(item);
  }

  // clear() {
  //   const [first, second] = this.#items;

  //   this.#items = [];

  //   return [first, second];
  // }

}