const Association = require('../models/associationModel')

exports.create_viewed_movie = (req, res, next) => {

  Association.create({
    userId: req.params.userId,
    movieId: req.params.movieId,
    decade: req.params.decade,
    actor: req.params.actor
  })
  .then(association => {res.status(201).json(association)})
  .catch((err) => res.status(500).json(err))
}

exports.destroy_viewed_movie = (req, res, next) => {

  Association.destroy({ where : { userId : req.params.userId, movieId : req.params.movieId }})
  .then(() => res.status(200).json({ message : 'Deleted viewed movie' }))
  .catch((err) => res.status(500).json(err))
}

exports.get_viewed_movies = (req, res, next) => {

  Association.findAll({ where : { userId : req.params.userId }})
  .then(movies => res.status(200).json(movies))
  .catch((err) => res.status(500).json(err))
}