import _style from '../style.js';
import _template from '../template.js';


const app = document.querySelector('#app');
const appBody = document.querySelector('#app-body')

const dbg = document.querySelector('debugger-man');
let display = 'hide'

// dbg.setAttribute('display', display)
// document.addEventListener('debugger:attached', e => {
//   dbg.extend({
//     onclick({ target }) {
//       display = ['hide', null].includes(display) ? 'show' : 'hide'

//       dbg.setAttribute('display', display)

//       console.warn('ON CLICK EXTENSION WORKS', { _this: this, target });
//     }
//   })
// });