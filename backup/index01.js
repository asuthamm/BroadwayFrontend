const mainDiv        = document.querySelector('.main')
const showingsDiv    = document.querySelector('div.showings')
const awardsUl       = document.querySelector('.awards')
const singleshowDiv  = document.querySelector('.single-details')
function fetchData(){
    let data = fetch('http://localhost:3000/shows')
      .then( res => res.json() )
      .then(obj => obj.forEach(parseData))
  }
   
  fetchData()
  
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
      likesDiv.innerText = show.likes
      const image = document.createElement('img')
      image.src = show.image
      image.alt = show.title

      singleshowDiv.append(headerDiv, showTypeDiv, oDateDiv, perfDiv, likesDiv, image)

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
 


}
