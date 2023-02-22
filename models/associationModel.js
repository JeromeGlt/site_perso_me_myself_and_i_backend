const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Movie = require('./movieModel')
const User = require('./userModel')

const AssociationModel = sequelize.define('viewed_movie', {})

Movie.belongsToMany(User, { through: AssociationModel })

User.belongsToMany(Movie, { through: AssociationModel })

module.exports = AssociationModel