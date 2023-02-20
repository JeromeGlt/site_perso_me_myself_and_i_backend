const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/database")
const User = require("./userModel")

const Movie = sequelize.define("movie", {
  title: {
    type: DataTypes.STRING(300)
  },
  director: {
    type: DataTypes.STRING(300)
  },
  actor: {
    type: DataTypes.STRING(300)
  },
  year: {
    type: DataTypes.INTEGER
  },
  decade: {
    type: DataTypes.INTEGER
  }
})

module.exports = Movie