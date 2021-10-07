const express = require('express')
const {authCheck, adminCheck} = require("../middlewares/auth") 
const router = express.Router()
const {create, listAll, remove, read, update, list, productsCount, productStar, extractProductByCategory, readCategoryProduct,extractProductBySubs,readSubProduct, searchFilters} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create)
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products' , list);
//router.get('/products/total', productsCount);
router.put('/product/star/:productId', authCheck, productStar);
router.get('/products/relatedcategory/:productId', readCategoryProduct);
router.get('/products/relatedsubcategory/:productId', readSubProduct);
router.post('/search/filter', searchFilters)
//search product by subcategory
router.post('/products/extractbysubs/:subcategoryId', extractProductBySubs);
//search product by category
router.post('/products/extractbycategory/:categoryId', extractProductByCategory);


module.exports = router;