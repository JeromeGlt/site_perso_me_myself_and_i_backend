const Movie = require('../models/movieModel')

exports.getAllMovies = (req, res, next) => {
    Movie.findAll()
    .then(movies => res.status(200).json(movies))
    .catch(error => res.status(400).json({ error }))
}