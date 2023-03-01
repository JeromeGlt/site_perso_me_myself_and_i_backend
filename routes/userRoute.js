const express = require('express')
const router = express.Router()

const rateLimiter = require('../middlewares/rate-limiter')
const userController = require('../controllers/userController')

router.get('/', userController.getUser)
router.post('/signup', rateLimiter, userController.signup)
router.post('/login', rateLimiter, userController.login)
router.put('/:id', userController.modifyUser)
router.delete('/:id', userController.deleteUser)
// router.get('/movie/:idUser', auth, movieController.getUserMovies)

module.exports = router