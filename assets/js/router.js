import Article from './components/Article.js'
import ListPosts from './components/ListPosts.js';
import { mdToHtml, redirect, render } from './helpers.js';

export default async () => {
  const { hash } = window.location;

  if (hash === '') return redirect('#/');

  const route = hash.split('/').pop();

  const response = await fetch('./assets/posts.json');
  const posts = await response.json();

  if (route === '') {
    render(ListPosts(posts));
    scrollReveal(document.querySelectorAll('.post-card'), { scale: 1 })
  }

  const existPath = posts.some(({ path }) => path === hash);

  if (existPath) {
    const response = await fetch(`./assets/posts/${route}.md`);
    const md = await response.text();
    render(Article(mdToHtml(md)));
  }
};
