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

  /*  Loop through the results[] array. For each result, create a clone of the
     template and append it to the DOM element with the .container class. */

  let i = 0;
  posts.forEach(post => {
    i++;
    if (i < 10) {
      const newClone = template.content.cloneNode(true);

      const cloneImg = newClone.querySelector('.post__img')
      const cloneUser = newClone.querySelector('.post__user');
      const cloneDesc = newClone.querySelector('.post__desc');

      /* Add an attribution statement below the image using the
    postUser element and the photographer's name from dataObj */

      const dataObj = response.results[0];
      console.log(response.results[0]);



      cloneImg.src = dataObj.urls.small;
      cloneImg.alt = dataObj.alt_description;
      cloneUser.innerText = post.user;
      cloneDesc.innerText = 'AAAAAAAAAAAAAAAAAA';
      container.appendChild(newClone);

    }
  }).catch(err => console.log(err));
}



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
