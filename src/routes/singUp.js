const express = require('express')
const router = express.Router()

// controllers
const AuthController = require('../controllers/auth.controller')

// register/singUp user route
router.post('/', AuthController.singUp)

module.exports = router
