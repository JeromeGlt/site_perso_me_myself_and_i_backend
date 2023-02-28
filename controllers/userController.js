const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordSchema = require('../utils/password')
const {Op} = require('sequelize')

exports.signup = (req, res, next) => {

  if(!passwordSchema.validate(req.body.password)) {
    return res.status(500).json({ message : "Absence de mot de passe" })
  }
  if(!req.body.username) {
    return res.status(500).json({ message : "Absence de pseudo" })
  }
  User.findOne({ where : {
    [Op.or]: [
      { username : req.body.username }
    ]
  }})
  .then(user => {
    if(!user) {
      bcrypt.hash(req.body.password, 10)
      .then(hash => {
        User.create({
          username: req.body.username,
          password: hash
        })
        .then(user => {
          res.status(200).json({
            userId: user.id,
            username: user.username,
            token: jwt.sign(
              {userId: user.id},
              process.env.TOKEN,
              {expiresIn: '24h'}
            )
          })
        })
        .catch((err) => res.status(500).json(err))
      })
      .catch((err) => res.status(500).json(err))
    }else{
      res.status(403).json({ message : 'Pseudo déjà utilisé' })
    }
  })
  .catch((err) => res.status(500).json(err))  
}