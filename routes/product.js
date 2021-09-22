const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create)
module.exports = router;