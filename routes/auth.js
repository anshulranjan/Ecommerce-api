const express = require('express')
const {authCheck} = require("../middlewares/auth") 
const router = express.Router()
const {CreateorUpdateUser} = require('../controllers/auth')
router.post('/create-update-user', authCheck, CreateorUpdateUser)

module.exports = router;