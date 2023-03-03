const express = require('express')
const router = express.Router()

const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovies)
router.post('/', movieController.createMovie)
router.delete('/:id', movieController.deleteMovie)
router.put('/:id', movieController.modifyMovie)

module.exports = router