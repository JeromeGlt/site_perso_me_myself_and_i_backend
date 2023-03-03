const Association = require('../models/associationModel')
const jwt = require('jsonwebtoken')

exports.viewed_movie = (req, res, next) => {

//   const token = req.headers.authorization.split(' ')[1]
//   const decodedToken = jwt.verify(token, process.env.TOKEN)
//   const userId = decodedToken.userId

  Association.create({
    userId: req.params.userId,
    movieId: req.params.movieId
  })
  .then(association => {res.status(201).json(association)})
  .catch((err) => res.status(500).json(err))
}