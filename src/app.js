const form = document.querySelector('.search-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const response = await fetch('/.netlify/functions/unsplash-search', {
    method: 'POST',
    body: JSON.stringify({
      query: formData.get('query'),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));

  const container = document.querySelector('.container');
  const template = document.querySelector('#template');

  if (Array.isArray(response.results)) {
    try {
      let i = 0;
      response.results.map(post => {
        i++;
        if (i < 11) {
          const newClone = template.content.cloneNode(true);

          const cloneImg = newClone.querySelector('.post__img')
          const cloneUser = newClone.querySelector('.post__user');
          const cloneDesc = newClone.querySelector('.post__desc');

          cloneImg.src = post.urls.small;
          cloneImg.alt = post.alt_description;

          const userFirst = post.user.first_name;
          const userLast = post.user.last_name;
          const userFull = `By: `
          if (userFirst == null && userLast == null) {
            cloneUser.innerText = userFull + 'Unknown Author';
          } else if (userFirst != null) {
            cloneUser.innerText = userFull + userFirst;
          } if (userLast != null) {
            cloneUser.innerText = userFull + userLast;
          }

          if (post.description == null) {
            cloneDesc.innerText = 'No Description';
          }
          else if (post.description.length < 100) {
            cloneDesc.innerText = post.description;
          } else {
            cloneDesc.innerText = post.description.slice(0, 100) + '...';
          }

          container.appendChild(newClone);
        }
      })
    }
    catch (error) {
      container.innerText = 'Invalid Results!'
    }
  }
}
)
