const express = require('express')
const router = express.Router()
// const auth = require('../middleware/auth')

const associationController = require('../controllers/associationController')

router.get('/:userId', associationController.get_viewed_movies)
router.post('/:userId/:movieId/:decade', associationController.create_viewed_movie)
router.delete('/destroy/:userId/:movieId', associationController.destroy_viewed_movie)

module.exports = router