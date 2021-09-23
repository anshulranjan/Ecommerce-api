const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, read, update, remove, list, getSubBrand} = require('../controllers/subcategory');

router.post('/subcategory', authCheck, adminCheck, create)
router.get('/subcategories', list)
router.get('/subcategory/:slug', read)
router.put('/subcategory/:slug', authCheck, adminCheck, update)
router.delete('/subcategory/:slug', authCheck, adminCheck, remove)
router.get('/subcategory/brand/:_id', getSubBrand)

module.exports = router;