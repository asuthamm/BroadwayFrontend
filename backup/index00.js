const showingsDiv = document.querySelector('div.showings')


function fetchData(){
    let data = fetch('http://localhost:3000/shows')
      .then( res => res.json() )
      .then(obj => obj.forEach(parseData))
  }
   
  fetchData()
  
  function parseData(show) {
    // console.log(show.title)
    // console.log(show.show_type)
    // console.log(show.opening_date)
    // console.log(show.performances)
    // console.log(show.likes)
    // console.log(show.image)

    const cardDiv = document.createElement('div')
      cardDiv.className = 'xcard'
    // const contentDiv = document.createElement('div')
    // const headerDiv = document.createElement('div')
    //   headerDiv.className = 'header'
    //   headerDiv.innerText = show.title
    // const showTypeDiv = document.createElement('div')
    //   showTypeDiv.className = 'show-type'
    //   showTypeDiv.innerText = show.show_type
    // const oDateDiv = document.createElement('div')
    //   oDateDiv.className = 'o-date'
    // const perfDiv = document.createElement('div')
    //   perfDiv.innerText = show.performances
    // const likesDiv = document.createElement('div')
    //   likesDiv.className = 'likes'
    //   likesDiv.innerText = show.likes
    const image = document.createElement('img')
      image.src = show.image
      image.alt = show.title

      // contentDiv.append(headerDiv, showTypeDiv, oDateDiv, perfDiv, likesDiv, image)
      cardDiv.append(image)
      showingsDiv.append(cardDiv)
  }