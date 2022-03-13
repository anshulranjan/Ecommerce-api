const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const couponSchema = new Schema({
    name :{
        type: String,
        required: true,
        trim:true,
        unique:true,
        uppercase:true,
        minlength: 6,
        maxlength: 15,
    },
    expiry:{
        type:Date,
        required: true,
    },
    discount:{
        type: Number,
        required: true,
    }
},{timestamps: true});
module.exports = mongoose.model('Coupon', couponSchema);