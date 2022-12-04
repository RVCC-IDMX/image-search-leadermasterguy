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
  posts.forEach(post => {
    i++;
    if (i < 10) {
      const newPost = document.importNode(postTemplate.content, true);

      const postTitle = newPost.querySelector('.post__title');
      const postBody = newPost.querySelector('.post__body');
      const postImg = newPost.querySelector('.post__img')

      const dataObj = response.results[0];

      postImg.src = dataObj.urls.small;
      postImg.alt = dataObj.alt_description;
      postTitle.innerText = title;
      postBody.innerText = body;

      postSection.appendChild(newPost);

    }).catch(err => console.log(err));
}

  /*
    Loop through the results[] array. For each result, create a clone of the
    template and append it to the DOM element with the .container class.
  */

  /*
    Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj
   */

  /*
    Check the description of the post. If it's bot bull and less than 100 characters,
    add the description from dataObj to the post. If it's more than 100 characters,
    add the first 100 characters of the description from dataObj to the post followed by
    an ellipsis (...)
  */
});
