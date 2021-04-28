const express = require("express")
const { db } = require('../config_db/config')
const router = express.Router();

//controllers
const { getCheckUser, getCheckEmail, postProfile, getProfile } = require('../controllers/operations')

//routes
router.get('/checkUsername', getCheckUser)
router.get('/checkEmail', getCheckEmail)
router.post('/profile', postProfile)
router.get('/select_profile', getProfile)

module.exports = router