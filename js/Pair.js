export class Pair {
  #limit = 2
  #items = new Array(2);

  constructor(matcherFn) {}

  static create(...items) {
    if (!(items)) return console.error('Need two items passed to Pair.set');


    const p = new Pair()
    items.length = items.length > 2 ? 2 : items.length;
    p.add(...items);

    return this.size;
  }
  
  static create2(itemA, itemB, matcherFn = (a, b) => a === b) {
    if (!(itemA && itemB)) return console.error('Need two items passed to Pair.set');


    const p = new Pair(matcherFn)
    this.#items.push(itemA, itemB);

    return this.size;
  }

  add(...items) {
    if (!this.isFull ) {
      this.#items.push(item);
    }

    return this.size;
  }

  clear() {
    const [first, second] = this.#items;

    this.#items = [];

    return [first, second];
  }

  get first() { return this.#items[0] || null };

  get second() { return this.#items[1] || null };

  get size() { return this.#items.length };

  get isFull() { return this.#items.length >= this.#limit };
}