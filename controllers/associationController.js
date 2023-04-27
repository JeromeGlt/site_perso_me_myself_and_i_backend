const Association = require('../models/associationModel')
const jwt = require('jsonwebtoken')

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

  const token = req.headers.authorization.split(' ')[1]
  const decodedToken = jwt.verify(token, process.env.TOKEN)
  const userIdToken = decodedToken.userId

  Association.findAll({ where : { userId : userIdToken }})
  .then(movies => res.status(200).json(movies))
  .catch((err) => res.status(500).json(err))
}