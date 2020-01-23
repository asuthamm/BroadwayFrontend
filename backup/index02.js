// added on 1/22 at 11:50am
const mainDiv        = document.querySelector('.main')
const showingsDiv    = document.querySelector('div.showings')
const awardsUl       = document.querySelector('.awards')
const singleshowDiv  = document.querySelector('.single-details')
const commentsUl    = document.querySelector('.commnt')
const formContainer = document.getElementById('form-container')

function initFetch(){
  fetch('http://localhost:3000/shows')
    .then( res => res.json() )
    .then(obj => obj.forEach(parseData))
}  
  initFetch()
  
function parseData(show) {
  const cardDiv = document.createElement('div')
    cardDiv.className = 'xcard'

  const image = document.createElement('img')
    image.src = show.image
    image.alt = show.title

  cardDiv.append(image)
  showingsDiv.append(cardDiv)

  cardDiv.addEventListener('click', e => {
    // console.log('click', show)
    showDetails(show)
  })
  cardDiv.addEventListener("mouseover", e => {
    console.log(show.likes)
  })


}

function showDetails(show) {
  showingsDiv.classList.add("hide")

  const headerDiv = document.createElement('div')
    headerDiv.className = 'header'
    headerDiv.innerText = show.title
  const showTypeDiv = document.createElement('div')
    showTypeDiv.className = 'show-type'
    showTypeDiv.innerText = show.show_type
  const oDateDiv = document.createElement('div')
    oDateDiv.className = 'o-date'
    oDateDiv.innerText = show.opening_date
  const perfDiv = document.createElement('div')
    perfDiv.className = 'performances'
    perfDiv.innerText = show.performances
  const likesDiv = document.createElement('div')
    likesDiv.className = 'likes'
    likesDiv.innerText = `${show.likes} Likes`
  const image = document.createElement('img')
    image.src = show.image
    image.alt = show.title
  const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.innerText = 'Like <3'

  singleshowDiv.append(headerDiv, showTypeDiv, oDateDiv, perfDiv, likesDiv, image, likeBtn)

  likeBtn.addEventListener('click', (e) => {
    increaseLikes(show, likesDiv)
  })

  // iterate thru awards & nominee
  show.awards.forEach((award) => {
    li = document.createElement('li')
    li.innerText = `${award.award_ceremony} - ${award.category}`

    const subUl = document.createElement('ul')
    award.nominees.forEach((person) => {
      subLi = document.createElement('li')
      subLi.className = 'subli'
      subLi.innerText = person.name
      subUl.append(subLi)
    })
    li.append(subUl)
    awardsUl.append(li)
  })

  show.comments.forEach((comnt) => {
    comntLi = document.createElement('li')
    comntLi.innerText = `${comnt.commnt}`
    commentsUl.append(comntLi)
  })

  renderForm(show)
}

function increaseLikes(show, likesDiv) {
  // console.log(show, show.id)
  show.likes += 1
  // console.log(likesDiv, show.likes)

  // console.log(`http://localhost:3000/shows/${show.id}`)
  fetch(`http://localhost:3000/shows/${show.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: show.likes
    })
  })
    .then( res => res.json() )
    // .then(console.log)
    .then(showObj => {
      likesDiv.innerText = `${show.likes} Likes`
    })
}

function renderForm(show){
  formContainer.innerHTML = ""
  let newReviewForm = document.createElement("form")
  newReviewForm.id = "new-review"

  newReviewForm.innerHTML = `<div class="form-group">
  <textarea class="form-control" id="review-content" rows="2" cols="50"></textarea>
  <input type="submit" class="btn btn-primary"></input>
</div>`

// const newDiv = document.createElement("div")
//   newDiv.className = "form-group"
// const textarea = document.createElement('textarea')
//   textarea.className = 'review-content'
//   textarea.rows = 3
//   textarea.cols = 30
// const submitBtn = document.createElement('button')

  formContainer.append(newReviewForm)

  newReviewForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newComment = e.target["review-content"].value
    // console.log(newComment)
    commentPost(show, newComment)
  })

}

function commentPost(show, newComment) {
  console.log(show.id, newComment)
  fetch('http://localhost:3000/comments', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      show_id: show.id,
      commnt: newComment
    })
  })
  .then(r => r.json())
  .then(console.log)
  // .then((console.log) => {
    // takeOneReviewToLi(newReview)
    // shoeObj.reviews.push(newReview)
  // })
}


