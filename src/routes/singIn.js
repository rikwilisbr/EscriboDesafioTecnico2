const express = require('express')
const router = express.Router()

// controllers
const AuthController = require('../controllers/auth.controller')

// login/signIn user route
router.post('/', AuthController.singIn)

module.exports = router
