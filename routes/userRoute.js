const express = require('express')
const router = express.Router()

// const auth = require('../middleware/auth')
const userController = require('../controllers/userController')

// router.get('/', userController.getUser)
router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.put('/:id', userController.modifyUser)
// router.delete('/:id', userController.deleteUser)
// router.get('/movie/:idUser', auth, movieController.getUserMovies)

module.exports = router