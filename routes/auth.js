const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {CreateorUpdateUser, currentUser} = require('../controllers/auth')
router.post('/create-update-user', authCheck, CreateorUpdateUser)
router.post('/currentuser', authCheck, currentUser)
router.post('/currentadmin', authCheck, adminCheck, currentUser)

module.exports = router;