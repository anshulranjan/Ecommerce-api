const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, read, update, remove, list} = require('../controllers/brand');

router.post('/brand', authCheck, adminCheck, create)
router.get('/brand', list)
router.get('/brand/:_id', read)
router.put('/brand/:_id', authCheck, adminCheck, update)
router.delete('/brand/:_id', authCheck, adminCheck, remove)


module.exports = router;