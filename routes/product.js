const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, listAll} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create)
router.get('/products/:count', listAll);
module.exports = router;