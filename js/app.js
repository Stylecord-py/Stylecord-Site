import { wire } from './code-blocks.js';

const m = document.getElementById('menu');
const n = document.querySelector('nav.main');

m && m.addEventListener('click', () => {
  const o = n.classList.toggle('open');
  m.setAttribute('aria-expanded', o);
});

wire();
