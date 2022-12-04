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

  // console.log(response);

  const container = document.querySelector('.container');
  const template = document.querySelector('#template');

  let i = 0;
  response.results.forEach(post => {
    i++;
    if (i < 10) {
      const newClone = template.content.cloneNode(true);

      const cloneImg = newClone.querySelector('.post__img')
      const cloneUser = newClone.querySelector('.post__user');
      const cloneDesc = newClone.querySelector('.post__desc');

      cloneImg.src = dataObj.urls.small;
      cloneImg.alt = dataObj.alt_description;
      cloneUser.innerText = `By: ${post.user.first_name} ${post.user.last_name}`;
      if (post.description.length > 100) {
        cloneDesc.innerText = post.description;
      } else {
        cloneDesc.innerText = post.description.slice(0, 100) + '...';
      }

      container.appendChild(newClone);

    }
  }).catch(err => console.log(err));
}
)
