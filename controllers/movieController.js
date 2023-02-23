const Movie = require('../models/movieModel')

exports.getAllMovies = (req, res, next) => {

  Movie.findAll()
  .then(movies => res.status(200).json(movies))
  .catch(err => res.status(400).json(err))
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
  .catch(err => res.status(404).json(err))
  console.log(movie)
}

exports.modifyMovie = (req, res, next) => {

  const movieObject = {
    title: req.body.title,
    director: req.body.director,
    actor: req.body.actor,
    year: req.body.year,
    decade: req.body.decade
  }

  Movie.update({ ...movieObject }, { where : { id : req.params. id }})
  .then(() => res.status(200).json({ message : 'Amended movie' }))
  .catch(err => res.status(404).json(err))
}

exports.deleteMovie = (req, res, next) => {

  Movie.findOne({ where : { id : req.params.id }})
  .then(movie =>
    Movie.destroy({ where : { id : req.params.id }})
    .then(() => res.status(200).json({ message : 'Deleted movie' }))
    .catch(err => res.status(404).json(err))
  )
  .catch(err => res.status(404).json(err))
}