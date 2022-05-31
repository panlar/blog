import Router from './router.js';

document.addEventListener('DOMContentLoaded', () => {
  Router();
});

window.addEventListener('hashchange', () => {
  Router();
});
