const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')

const associationController = require('../controllers/associationController')

router.post('/:userId/:movieId', associationController.viewed_movie)

module.exports = router