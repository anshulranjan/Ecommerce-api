const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, read, update, remove, list, getSubCategories, productCountWithCategory} = require('../controllers/category');

router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)
router.get('/category/subcategory/:_id', getSubCategories)
module.exports = router;