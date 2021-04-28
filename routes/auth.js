const express = require("express")

const router = express.Router();

//controllers
const { getSignup, getLogin, getPassword } = require('../controllers/auth')

//routes
router.post('/signup', getSignup)
router.get('/login', getLogin)
router.get('/password', getPassword)

module.exports = router