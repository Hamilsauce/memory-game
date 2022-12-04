import _style from './style.js';
import _template from './template.js';

import ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
const { rxjs, utils } = ham;

const { timer, sampleTime, forkJoin, Observable, iif, BehaviorSubject, AsyncSubject, Subject, interval, of , fromEvent, merge, empty, delay, from } = rxjs;
const { takeUntil, takeWhile, concatMap, flatMap, reduce, groupBy, toArray, mergeMap, switchMap, scan, map, tap, filter } = rxjs.operators;
const { fromFetch } = rxjs.fetch;
const animate = (target, stylePropName, newValue, time = 200) => {
  const tempTrans = target.style.transition;
  const temp = target.style[stylePropName];

  target.style.transition = `${time/1000}s`

  target.style[stylePropName] = newValue;

  setTimeout(() => {
    setTimeout(() => {
      target.style[stylePropName] = temp;
      target.style.transition = tempTrans
    }, time)
  }, time)

};


class DebuggerMan extends HTMLElement {
  #_shadow;
  #pointer$
  #isDragging = false;

  static get observedAttributes() {
    return ['display', 'dragging'];
  }

  constructor() {
    super();

    this.#_shadow = this.attachShadow({ mode: 'open' });

    this.#getTemplate(_template);

    this.style.transform = `translate(${0}px, ${0}px) scale(1)`;

    this.#pointer$ = {
      down: fromEvent(this, 'pointerdown').pipe(
        concatMap(() => timer(500)
          .pipe(
            tap(x => console.log('timer 1', x)),
            takeUntil(this.#pointer$.up),
            takeUntil(this.#pointer$.click),
          )),
      ),
      move: fromEvent(this, 'pointermove'),
      up: fromEvent(this, 'pointerup').pipe(),
      click: fromEvent(this, 'click')
        .pipe(
          tap(x => animate(this, 'transform', `translate(${this.width/20}px, ${this.height/20}px) scale(1.2)`, 0)),
        ),
    };

    const click$ = this.#pointer$.click

    click$.subscribe();

    const drag$ = this.#pointer$.down
      .pipe(
        tap(() => this.isDragging = true),
        concatMap(downEvent => this.#pointer$.move
          .pipe(
            takeUntil(this.#pointer$.up),
            filter(({ clientX, clientY }) => this.isValidMove(clientX, clientY)),
            map(({ clientX, clientY }) => this.#pointToCenter(clientX, clientY)),
            tap(pt => this.#moveTo(pt)),
            tap(() => this.style.transform = `translate(${this.width / (this.isDragging === true ? 3 : 4)}px, ${this.height / (this.isDragging === true ? 6 : 10)}px) scale(${this.isDragging === true ? 1.3 : 1})`),
          )
        ),
        concatMap(() => this.#pointer$.up
          .pipe(
            filter(() => this.isDragging === true),
            tap(() => this.isDragging = false),
            tap(() => this.style.transform = `translate(${this.width / (this.isDragging === true ? 3 : 100)}px, ${this.height / (this.isDragging === true ? 6 : 10)}px) scale(${this.isDragging === true ? 1.3 : 1})`),
          )
        )
      );

    this.dragSubscription = drag$.subscribe()
  }

  get #shadow() { return this.#_shadow }

  get panel() { return this.#shadow.querySelector('#debugger-panel') }

  get isDragging() {
    return this.getAttribute('dragging') === 'true' ? true : false;
  }

  set isDragging(v) { this.setAttribute('dragging', v); }

  get center() {
    const { x, y, width, height } = this.getBoundingClientRect()

    return {
      x: x + (width / 2),
      y: y + (height / 2),
    }
  }

  get bbox() { return this.getBoundingClientRect() }

  get width() { return this.bbox.width }

  get height() { return this.bbox.height }

  get toggle() { return this.#shadow.querySelector('#debugger-toggle') }

  isValidMove(x, y) {
    return x - (this.width / 4) > 0 &&
      x + (this.width / 1.5) <= window.innerWidth &&
      y - (this.height / 4) >= 0 &&
      y + (this.height / 4) < window.innerHeight - 37
  }

  get isInViewport() {
    return this.bbox.left >= 0 &&
      this.bbox.right < window.innerWidth &&
      this.bbox.top >= 0 &&
      this.bbox.bottom < window.innerHeight
  }

  get extend() { return this.#extend }


  #pointToCenter(x, y) {
    return {
      x: x - (this.width / 2),
      y: y - (this.height / 2),
    }
  }

  #moveTo(point = new DOMPoint(this.center.x, this.center.y)) {
    this.style.top = `${point.y}px`;
    this.style.left = `${point.x}px`;

    return point;
  }

  #getTemplate(template) {
    const temp = new DOMParser().parseFromString(template, 'text/html').documentElement

    this.#shadow.append(
      temp.querySelector('#debugger-style'),
      ...temp.querySelector('#debugger-man').children
    );
  }

  #extend(extension) {
    Object.assign(this, extension)
  }

  connectedCallback() {
    this.dispatchEvent(new CustomEvent('debugger:attached', { bubbles: true, detail: { debuggerMan: this } }))
  }

  disconnectedCallback() {
    // console.log('Custom square element removed from page.');
  }

  adoptedCallback() {
    // console.log('Custom square element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('Custom square element attributes changed.');

    // console.log('attributeChangedCallback');
    // console.warn('{name, oldValue, newValue}', { name, oldValue, newValue })
    // updateStyle(this);
  }
}

customElements.define('debugger-man', DebuggerMan);