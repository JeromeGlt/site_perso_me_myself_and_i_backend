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

exports.login = (req, res, next) => {
  User.findOne({ where : { username: req.body.username }})
  .then(user => {
    if(!user) {
      return res.status(401).json({ message : 'Utilisateur non trouvé' })
    }
    bcrypt.compare(req.body.password, user.password)
    .then(valid => {
      if(!valid) {
        return res.status(401).json({ message : 'Mot de passe incorrect' })
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

// exports.modifyProfile = (req, res, next) => {
//   const userObject = req.file ? {
//     ...req.body,
//     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : {
//     ...req.body
//   }

//   User.update({ ...userObject }, { where : { id : req.params.id }})
//   .then(() => res.status(200).json({ message : 'Utilisateur modifié' }))
//   .catch((error) => res.status(500).json({ error }))
// }

// exports.delete = (req, res, next) => {
//   User.findOne({ where : { pseudo : req.params.pseudo }})
//   .then(user => {
//       if(!user) {
//           return res.status(401).json({ message : 'Utilisateur non trouvé' })
//       }
//       const filename = user.imageUrl.split('/images/')[1]
//       fs.unlink(`images/${filename}`, () => {
//           User.destroy({ where : { pseudo : req.params.pseudo }})
//           .then(() => res.status(200).json({ message : 'Utilisateur supprimé !' }))
//           .catch(() => res.status(500).json({ message : 'Suppression impossible !' }))
//       })
//   })
//   .catch((error) => res.status(500).json({ error }))
// }