const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, read, update, remove, list} = require('../controllers/brand');

router.post('/brand', authCheck, adminCheck, create)
router.get('/brand', list)
router.get('/brand/:slug', read)
router.put('/brand/:slug', authCheck, adminCheck, update)
router.delete('/brand/:slug', authCheck, adminCheck, remove)

module.exports = router;