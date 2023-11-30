const express = require('express')
const router = express.Router()

// middlewares
const middlewareJWT = require('../middlewares/jwt.middleware')

// controllers
const UserController = require('../controllers/user.controller')

// search for user route
router.get('/userID=:userID', middlewareJWT, UserController.getUser)

module.exports = router
