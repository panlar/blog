const Post = ({ title, date, path, image, description }) => {
  return `<figure class="post-card">
    <a href="${path}">
      <div class="post-img">
        <img src="${image}">
      </div>
      <time class="post-date">${date}</time>
      <figcaption class="post-caption">${title}</figcaption>
      <p class="post-description">${description}</p>
    </a>
  </figure>`
}

export default Post