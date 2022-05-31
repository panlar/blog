const showdownConfig = {
  openLinksInNewWindow: true,
  metadata: true,
  tables: true,
  tasklists: true,
};

const formatDate = (date, locale, options = {}) =>
  new Intl.DateTimeFormat(locale, options).format(date);

const redirect = (hash) => (window.location.hash = hash);

const mdToHtml = (md) => {
  const converter = new showdown.Converter(showdownConfig);

  const html = converter.makeHtml(md);
  const metadata = converter.getMetadata();

  return { html, metadata };
};

const render = ({ html, metadata }) => {
  const $app = document.getElementById('app');
  $app.innerHTML = '';
  $app.innerHTML = html;

  const { title } = metadata;
  document.title = title;

  hljs.highlightAll();
};

const setSEOMetadata = ({ title, description, image}) => {
  const $metaDescription = document.querySelectorAll(
    'meta[name="twitter:description"], meta[property="og:description"], meta[name="description"]'
  );

  const $metaTitle = document.querySelectorAll(
    'meta[name="twitter:title"], meta[property="og:title"]'
  );

  const $metaImage = document.querySelectorAll(
    'meta[name="twitter:image"], meta[property="og:image"]'
  );

  $metaDescription.forEach(meta => meta.setAttribute('content', description));
  $metaTitle.forEach(meta => meta.setAttribute('content', title));
  $metaImage.forEach(meta => meta.setAttribute('content', image));
}

export { formatDate, redirect, mdToHtml, render, setSEOMetadata };
