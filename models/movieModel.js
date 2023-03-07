const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/database")
const User = require("./userModel")

const Movie = sequelize.define("movie", {
  title: {
    type: DataTypes.STRING(300),
    unique: true,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  actor: {
    type: DataTypes.STRING(300),
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  decade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Movie