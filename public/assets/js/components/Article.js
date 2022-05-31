import { setSEOMetadata } from "../helpers.js"

const Article = ({ html: html5, metadata }) => {
  const html = `<article class="post section">${html5}</article>`;
  setSEOMetadata(metadata);
  return { html, metadata };
};

export default Article;
