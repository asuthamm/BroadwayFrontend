// this version has added features during code walkthru with eric

const mainDiv        = document.querySelector('.main')
const showingsDiv    = document.querySelector('div.showings')
const awardsUl       = document.querySelector('.awards')
const singleDiv      = document.querySelector('.single')
const singleshowDiv  = document.querySelector('.single-details')
const commentsUl     = document.querySelector('.commnt')
const formContainer  = document.getElementById('form-container')
const txtArea        = document.querySelector('#review-content')
const mainBtn        = document.querySelector('.main-Btn')

// initial fetch
initFetch()

function initFetch(){
  fetch('http://localhost:3000/shows')
    .then( res => res.json() )
    .then(obj => obj.forEach(renderAllShows))
}  

// main page to show all image thumbnails
function renderAllShows(show) {
  singleDiv.classList.add("hide")
  const cardDiv = document.createElement('div')
    cardDiv.className = 'xcard'

  const image = document.createElement('img')
    image.src = show.image
    image.alt = show.title

  cardDiv.append(image)
  showingsDiv.append(cardDiv)

  // event listeners for each thumbnail 
  cardDiv.addEventListener('click', e => {
    renderEachShow(show)
  })
  // cardDiv.addEventListener("mouseover", e => {
  //   // console.log(show.likes)
  // })
}

// to render each show details
function renderEachShow(show) {
  commentsUl.innerHTML = ''
  singleshowDiv.innerHTML = ''
  awardsUl.innerHTML = ''
  showingsDiv.classList.add("hide")
  singleDiv.classList.remove("hide")

  const h1 = document.createElement('h1')
    h1.className = 'header'
    h1.innerText = show.title
  const bttn = document.createElement('button')
    bttn.innerText = 'Name'
  const h3 = document.createElement('h3')
    h3.className = 'show-type'
    h3.innerText = show.show_type
  const oDateDiv = document.createElement('h3')
    oDateDiv.className = 'o-date'
    oDateDiv.innerText = `Opening Day:    ${show.opening_date}`
  const perfDiv = document.createElement('h4')
    perfDiv.className = 'performances'
    perfDiv.innerText = `${show.performances} performances`
  const likesDiv = document.createElement('h4')
    likesDiv.className = 'likes'
    likesDiv.innerText = `${show.likes} Likes`
  const image = document.createElement('img')
    image.src = show.image
    image.alt = show.title
  const likeBtn = document.createElement('button')
    likeBtn.className = 'like-btn'
    likeBtn.innerText = 'Like <3'

  singleshowDiv.append(h1, h3, oDateDiv, perfDiv, likesDiv, image, likeBtn, bttn)

  bttn.addEventListener('click', (e) => {
    const newVar = show.title.split("").reverse().join("") + '!'
    fetch(`http://localhost:3000/shows/${show.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: newVar
      })
    })
      .then( res => res.json() )
      // .then(console.log)
      .then(showObj => {
        h1.innerText = newVar
        show.title   = newVar
      })








  })
  // event listener for the like button
  likeBtn.addEventListener('click', (e) => {
    increaseLikes(show, likesDiv)
  })
  
  // event listener for the 'going back to main' button
  mainBtn.addEventListener('click', (e) => {
    singleDiv.classList.add("hide")
    showingsDiv.classList.remove("hide")
  })
   renderAwards(show)
}

// path the # of likes
function increaseLikes(show, likesDiv) {
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

function renderAwards(show) {
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
    refreshCommentsUl(show, comnt) 
    console.log(show)
  })
  renderCommentForm(show)
}

// removed comment ul/li
function refreshCommentsUl(show, commentObj)  {
  // console.log('=>', commentObj)
  comntLi = document.createElement('li')
  comntLi.innerText = `${commentObj.commnt}`
  commentsUl.append(comntLi)

  comntLi.addEventListener('click', (e) => {
    // console.log('click', e.target, commentObj.id )
    fetch(`http://localhost:3000/comments/${commentObj.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      comntLi.remove()
      show.comments = show.comments.filter(comment => comment !== commentObj)
    })
  })
}

// take on a new comment
function renderCommentForm(show){
  formContainer.innerHTML = ""
  let newReviewForm = document.createElement("form")
  newReviewForm.id = "new-review"

  newReviewForm.innerHTML = `<div class="form-group">
  <textarea class="form-control" id="review-content" rows="2" cols="50"></textarea>
  <input type="submit" class="btn btn-primary"></input>
</div>`

  formContainer.append(newReviewForm)

  newReviewForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let newComment = e.target["review-content"].value
    // console.log(show.reviews)
    commentPost(show, newComment)
  })

}
// add new comment li to back-end; DOM; i-memory js obj
function commentPost(show, newComment) {
  // console.log(show.id, newComment)
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
  // .then(console.log)
  .then(commentObj => {
    refreshCommentsUl(show, commentObj) 
    show.comments.push(commentObj)
  })
}


