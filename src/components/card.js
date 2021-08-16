const axios = require('axios')

const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //

  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const divCard = document.createElement('div')
  divCard.classList.add('card')

  const divHeadline = document.createElement('div')
  divHeadline.classList.add('headline')
  divHeadline.textContent = article.headline
  divCard.appendChild(divHeadline)

  const divAuthor = document.createElement('div')
  divAuthor.classList.add('author')
  divCard.appendChild(divAuthor)

  const divImg = document.createElement('div')
  divImg.classList.add('img-container')
  divAuthor.appendChild(divImg)

  const img = document.createElement('img')
  img.setAttribute('src', article.authorPhoto)
  divImg.appendChild(img)

  const span = document.createElement('span')
  span.textContent = `By ${article.authorName}`
  divAuthor.appendChild(span)

  return divCard
}

const cardAppender = (selector) => {
  const data = axios.get('http://localhost:5000/api/articles').then((res) => {
    // console.log(res.data.articles)
    let obj = res.data.articles

    for (let topic in res.data.articles) {
      // console.log('TOPIC', topic)
      // console.log('OBJ[TOPIC]', obj[topic])

      let articleArr = obj[topic]
      articleArr.forEach((article) => {
        // console.log('id', article.id)
        // console.log('authorName', article.authorName)
        // console.log('authorPhoto', article.authorPhoto)
        // console.log('headline', article.headline)
        document.querySelector(selector).appendChild(Card(article))
      })
    }
  })

  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //
}

export { Card, cardAppender }
