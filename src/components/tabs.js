const axios = require('axios')

const Tabs = (topics) => {
  // TASK 3
  // ---------------------
  // Implement this function which takes an array of strings ("topics") as its only argument.
  // As an example, if the topics passed are ['javascript', 'bootstrap', 'technology']
  // then the function returns the markup below.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  //
  // <div class="topics">
  //   <div class="tab">javascript</div>
  //   <div class="tab">bootstrap</div>
  //   <div class="tab">technology</div>
  // </div>
  //
  const divTopics = document.createElement('div')
  divTopics.classList.add('topics')
  topics.forEach((el) => {
    let divTab = document.createElement('div')
    divTab.classList.add('tab')
    divTab.textContent = el
    divTab.addEventListener('click', (event) => {
      const allCards = Array.from(document.querySelectorAll('div.card'))
      console.log('ALL CARDS', allCards)

      let targetTopic = event.target.textContent

      if (targetTopic == 'node.js') {
        targetTopic = 'node'
      }
      console.log('TARGET TOPIC', targetTopic)
      const divsOfInterest = Array.from(
        document.querySelectorAll(`.${targetTopic}`)
      )

      if (event.target.classList.contains('filtered')) {
        allCards.forEach((el) => el.classList.remove('hidden'))
        event.target.classList.toggle('filtered')
      } else {
        event.target.classList.toggle('filtered')
        const toBeHidden = allCards.filter((el) => {
          console.log('LOOPING CARDS', el)
          return divsOfInterest.indexOf(el) == -1
        })
        console.log('TO BE HIDDEN', toBeHidden)

        toBeHidden.forEach((el) => el.classList.add('hidden'))
        divsOfInterest.forEach((el) => el.classList.remove('hidden'))
      }
    })
    divTopics.appendChild(divTab)
  })
  return divTopics
}

const tabsAppender = (selector) => {
  // TASK 4
  // ---------------------
  // Implement this function which takes a css selector as its only argument.
  // It should obtain topics from this endpoint: `http://localhost:5000/api/topics` (test it in Postman/HTTPie!).
  // Find the array of topics inside the response, and create the tabs using the Tabs component.
  // Append the tabs to the element in the DOM that matches the selector passed to the function.
  //
  axios
    .get(`http://localhost:5000/api/topics`)
    .then((res) => {
      const data = res.data.topics
      document.querySelector(selector).appendChild(Tabs(data))
    })
    .catch((err) => {
      console.log(err)
      document
        .querySelector(selector)
        .appendChild((document.createElement('p').textContent = err))
    })
}

// tabsAppender('body')

export { Tabs, tabsAppender }
