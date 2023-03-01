const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passwordSchema = require('../utils/password')
const {Op} = require('sequelize')

exports.signup = (req, res, next) => {

  if(!passwordSchema.validate(req.body.password)) {
    return res.status(500).json({ message : "Require a password" })
  }
  if(!req.body.username) {
    return res.status(500).json({ message : "Require a username" })
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
      res.status(403).json({ message : 'Username already exists' })
    }
  })
  .catch((err) => res.status(500).json(err))  
}

exports.login = (req, res, next) => {

  User.findOne({ where : { username: req.body.username }})
  .then(user => {
    if(!user) {
      return res.status(401).json({ message : 'Username not found' })
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ message : 'incorrect password' })
      }
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
}

exports.modifyUser = (req, res, next) => {

  User.findOne({ where : { username: req.body.username}})
  .then(user => {
    if(user) {
      return res.status(403).json({ message : 'Username already exists' })
    }
    User.update({ username: req.body.username }, { where : { id : req.params.id }})
    .then(() => res.status(200).json({ message : 'Amended user' }))
    .catch((err) => res.status(500).json(err))
  })
  .catch((err) => res.status(500).json(err))
}

exports.deleteUser = (req, res, next) => {
  User.findOne({ where : { id : req.params.id }})
  .then(user => {
      if(!user) {
          return res.status(401).json({ message : 'User not found' })
      }
      User.destroy({ where : { id : req.params.id }})
      .then(() => res.status(200).json({ message : 'Deleted user' }))
      .catch(() => res.status(500).json({ message : 'Deletion not possible' }))
  })
  .catch((err) => res.status(500).json(err))
}