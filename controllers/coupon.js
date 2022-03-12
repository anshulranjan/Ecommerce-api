const Coupon = require("../models/coupon")
exports.create = async( req, res) =>{
    try{
        const {name, expiry, discount} = req.body.coupon;
        const coupon = await new Coupon({name, expiry, discount}).save()
        res.json(coupon)
    }
    catch (err){
        console.log(err)
    }
}

exports.list = async( req, res) =>{
    try{
        const coupons = await Coupon.find({}).sort({createdAt: -1}).exec()
        res.json(coupons)
    }
    catch (err){
        console.log(err)
    }
}

exports.remove = async( req, res) =>{
    try{
        const coupon = await Coupon.findByIdAndDelete(req.params.couponId).exec()
        res.json(coupon);
    }
    catch (err){
        console.log(err)
    }
}