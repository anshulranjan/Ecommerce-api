const express = require('express')
const router = express.Router()
const {CreateorUpdateUser} = require('../controllers/auth')
router.get('/create-update-user', CreateorUpdateUser)

module.exports = router;