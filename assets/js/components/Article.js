const Article = ({ html : html5, metadata }) => {
  const html = `<article class="post section">${html5}</article>`;
  return { html, metadata };
}

export default Article