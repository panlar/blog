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

export { formatDate, redirect, mdToHtml, render };
