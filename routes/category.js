const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, read, update, remove, list, getSubCategories, getSubLists, getCategoryById} = require('../controllers/category');

router.post('/category', authCheck, adminCheck, create)
router.get('/categories', list)
router.get('/category/:slug', read)
router.put('/category/:slug', authCheck, adminCheck, update)
router.delete('/category/:slug', authCheck, adminCheck, remove)
router.get('/category/subcategory/:_id', getSubCategories)
router.get('/categoryById/:_id', getCategoryById)
module.exports = router;