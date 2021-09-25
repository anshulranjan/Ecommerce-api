const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {upload, remove} = require('../controllers/cloudinary')

router.post('/uploadimages', authCheck, adminCheck, upload)
router.post('/removeimage', authCheck, adminCheck, remove)

module.exports = router;