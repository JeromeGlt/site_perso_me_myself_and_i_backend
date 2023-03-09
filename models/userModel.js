const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define("user", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: DataTypes.STRING,
  isAdmin: DataTypes.BOOLEAN
})

module.exports = User