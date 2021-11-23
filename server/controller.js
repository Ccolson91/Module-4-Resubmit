const states = require('./states.json')
const favorites = require('./db.json')
let globalId = 7 

//we want to export this else where so..
module.exports = { 
    getStates: (req, res) => res.status(200).send(states),
    getFavorites: (req, res) => res.status(200).send(favorites),
    deleteFavorite: (req, res) => { 
        let index = favorites.findIndex(elem => elem.id === +req.params.id) 
        favorites.splice(index, 1)
        res.status(200).send(favorites) 
    },
    createFavorite: (req, res) => { 
        let{title, rating} = req.body
        let newFavorite = { 
            id: globalId,
            title,
            rating
        }
        favorites.push(newFavorite)
        res.status(200).send(favorites) 
        globalId++ 
    },
    updateFavorite: (req, res) => { 
        let { id } = req.params 
        let { type } = req.body   
        let index = favorites.findIndex(elem => +elem.id === +id) 

        if (favorites[index].rating === 5 && type === 'plus') {
            res.status(400).send('Priority cannot go above 5')
        } else if (favorites[index].rating === 0 && type === 'minus'){
            res.status(400).send('Priority cannot go below 0')
        } else if (type === 'plus') {
            favorites[index].rating++
            res.status(200).send(favorites)
        } else if (type === 'minus') {
            favorites[index].rating--
            res.status(200).send(favorites)
        } else {
            res.sendStatus(400)
        }
    }
}