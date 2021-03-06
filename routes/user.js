const express = require('express')
const {authCheck} = require("../middlewares/auth") 
const {userCart, getUserCart, emptyCart, saveAddress, getAddress, applyCoupon} = require("../controllers/user")
const router = express.Router()

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart)
router.delete('/user/cart',authCheck, emptyCart)
router.post('/user/address',authCheck, saveAddress)
router.get('/user/address', authCheck, getAddress);
router.post('/user/cart/coupon', authCheck, applyCoupon)
module.exports = router;