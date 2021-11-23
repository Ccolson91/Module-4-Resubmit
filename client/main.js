const favoritesContainer = document.querySelector('#favorites-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/favorites`

const favoritesCallback = ({ data: favorites }) => displayFavorites(favorites)
const errCallback = err => console.log(err.response)

const getAllFavorites = () => axios.get(baseURL).then(favoritesCallback).catch(errCallback)
const createFavorite = body => axios.post(baseURL, body).then(favoritesCallback).catch(errCallback)
const deleteFavorite = id => axios.delete(`${baseURL}/${id}`).then(favoritesCallback).catch(errCallback)
const updateFavorite = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(favoritesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()
    let title = document.querySelector('#title')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let imageURL = document.querySelector('#img')
    let bodyObj = {
        title: title.value,
        rating: rating.value, 
        imageURL: imageURL.value
    }
    createFavorite(bodyObj)
    title.value = ''
    rating.checked = false
    imageURL.value = ''
}

function createFavoriteCard(favorite) {
    const favoriteCard = document.createElement('div')
    favoriteCard.classList.add('favorite-card')
    favoriteCard.innerHTML = `
    <p class="favorite-title">${favorite.title}</p>
    <div class="btns-container">
        <button onclick="updateFavorite(${favorite.id}, 'minus')">-</button>
        <p class="favorites-rating">${favorite.rating} stars</p>
        <button onclick="updateFavorite(${favorite.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteFavorite(${favorite.id})">delete</button>
    `
    favoritesContainer.appendChild(favoriteCard)
}

function displayFavorites(arr) {
    favoritesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createFavoriteCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
getAllFavorites()

// states feature
const statesContainer = document.querySelector('#states-container')


const statesCallback = ({ data: states }) => showStates(states)


const getAllStates = () => axios.get('http://localhost:4000/api/states').then(statesCallback).catch(errCallback)

// create state card to display in html
function createStateCard(state) {
  const stateCard = document.createElement('div')
  stateCard.classList.add('state-card')

  stateCard.innerHTML = `
  <p>${state.state}</p>
  `
  statesContainer.appendChild(stateCard)
}
// Show states
function showStates(states) {
  statesContainer.innerHTML = ` `
    for(let i = 0; i < states.length; i++){
      createStateCard(states[i])
    }
}

//states button click event
document.getElementById("statesButton").onclick = function () {
  axios.get("http://localhost:4000/api/states")
  .then(function (response) {
    let allStates = []
    for(let i = 0; i < response.data.length; i++){
      const data = response.data[i].state
      allStates.push(data)
    }
    getAllStates()
  })
}