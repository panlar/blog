import Post from './Post.js';

const ListPosts = (posts) => {
  const html =
    posts.length > 0
      ? `<article class="list-posts">${posts
          .map((post) => Post(post))
          .join('')}</article>`
      : '<strong>No hay post<strong>';
  const metadata = { title: 'Blog | Johan Barahona' };
  return { html, metadata };
};

export default ListPosts;
