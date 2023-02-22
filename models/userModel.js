const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')
const Movie = require('./movieModel')

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
})

module.exports = User