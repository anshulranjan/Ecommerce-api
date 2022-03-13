const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const cartSchema = new Schema({
    products : [
        {
            product:{
                type: ObjectId,
                ref: 'Product'
            },
            count: Number,
            price: Number,
            discount: Number,
            delivery: Number,
        }
    ],
    cartTotal: Number,
    totalDiscount: Number,
    totalCouponDiscount: Number,
    totalDelivery: Number,
    totalFinalAmount: Number,
    orderedBy: {type: ObjectId, ref: "User"},
},{timestamps: true});
module.exports = mongoose.model('Cart', cartSchema);