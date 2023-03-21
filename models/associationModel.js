const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Movie = require('./movieModel')
const User = require('./userModel')

const AssociationModel = sequelize.define('viewed_movie', {
  decade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actor: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

Movie.belongsToMany(User, { through: AssociationModel })

User.belongsToMany(Movie, { through: AssociationModel })

module.exports = AssociationModel