const Movie = require('../models/movieModel')

exports.getAllMovies = (req, res, next) => {
  
  Movie.findAll()
  .then(movies => res.status(200).json(movies))
  .catch(error => res.status(400).json(error))
}

exports.createMovie = (req, res, next) => {

  const movie = Movie.create({
    title: req.body.title,
    director: req.body.director,
    actor: req.body.actor,
    year: req.body.year,
    decade: req.body.decade
  })
  .then(movie => res.status(200).json({ movie }))
  .catch(error => res.status(404).json(error))
  console.log(movie)
}