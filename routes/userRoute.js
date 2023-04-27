const express = require('express')
const router = express.Router()

const rateLimiter = require('../middlewares/rate-limiter')
const multer = require('../middlewares/multer-config')
const userController = require('../controllers/userController')

router.get('/', userController.getUser)
router.post('/signup', rateLimiter, multer, userController.signup)
router.post('/login', rateLimiter, userController.login)
router.put('/:id', userController.modifyUsername)
router.put('/modifyImage/:id', multer, userController.modifyImage)
router.delete('/:id', userController.deleteUser)

module.exports = router