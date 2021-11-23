const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// app.post("/api/mood", (req, res) => {
//   let moodContainer = document.getElementById('mood-container')

// })

// app.post('/api/mood/', (req, res) => {
//   const name = req.body.name
//   const mood = req.body.mood
//   let newObj = {
//     "name": name,
//     "mood": mood
//   }
//   res.status(200).send(newObj)
// })
app.get("/api/joke", (req, res) => {
  const answer = 'Hell-if-I-know!'
  res.status(200).send(answer)
})
app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

  app.get("/api/fortunes", (req, res) => {
    const fortunes = ["A faithful friend is a strong defense.",
             "A lifetime friend shall soon be made.",
             "A smile is your personal welcome mat.",
             "Courtesy is contagious.",
             "Do not let ambitions overshadow small success.",
             "Don’t just spend time. Invest it."
    ];
  
    // choose random compliment
    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];
  
    res.status(200).send(randomFortune);
    
  });

  
  const {getFavorites, deleteFavorite, createFavorite, updateFavorite, getStates} = require('./controller.js')
  
  app.get(`/api/states`, getStates)
  
  app.get(`/api/favorites`, getFavorites)
  app.delete(`/api/favorites/:id`, deleteFavorite) 
  app.post(`/api/favorites`, createFavorite)
  app.put(`/api/favorites/:id`, updateFavorite)

app.listen(4000, () => console.log("Server JAMMIN on 4000"));