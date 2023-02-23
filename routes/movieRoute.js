const express = require('express')
const router = express.Router()

// const auth = require('../middleware/auth')
const movieController = require('../controllers/movieController')

router.get('/', movieController.getAllMovies)
router.post('/', movieController.createMovie)
router.delete('/:id', movieController.deleteMovie)
router.put('/:id', movieController.modifyMovie)
// router.get('/post/:id', auth, PostCtrl.getOnePost)

module.exports = router