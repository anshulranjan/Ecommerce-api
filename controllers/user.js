const User = require("../models/user")
const Product = require("../models/product")
const Cart = require("../models/cart")

exports.userCart = async(req,res) => {
    const {cart} = req.body;
    let products = []
    const user = await User.findOne({email:req.user.email}).exec();
    let cartExistsByThisUser = await Cart.findOne({orderedBy: user._id})
    if(cartExistsByThisUser)
    {
        cartExistsByThisUser.remove()
    }
    let totalDiscount = 0;
    let totalDelivery = 0;
    for(let i=0;i<cart.length; i++)
    {
        let object = {}
        object.product = cart[i]._id;
        object.count = cart[i].count;
        let { price } = await Product.findById(cart[i]._id).select("price").exec();
        let { discount } = await Product.findById(cart[i]._id).select("discount").exec();
        let { delivery } = await Product.findById(cart[i]._id).select("delivery").exec();
        object.price = parseInt(price);
        if(delivery !== null && delivery !== undefined)
        {
            object.delivery = parseInt(delivery);
            totalDelivery = totalDelivery + object.delivery * object.count;
        }
        if(discount !== null && discount !== undefined)
        {
            object.discount = parseInt(discount);
            totalDiscount = totalDiscount + object.discount * object.count;
        }
        products.push(object);
    }
    let cartTotal = 0;
    for(let i=0;i<products.length; i++)
    {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }
    let newCart = await new Cart({
        products,
        cartTotal,
        totalDiscount,
        totalDelivery,
        orderedBy: user._id,
    }).save();
    res.json({ok:true})
};

exports.getUserCart = async(req,res) =>{
    const user = await User.findOne({email:req.user.email}).exec();
    let cart = await Cart.findOne({orderedBy: user._id}).populate('products.product','').exec();
    const {products, cartTotal, totalDiscount, totalAfterCouponDiscount, totalDelivery} = cart;
    res.json({products, cartTotal, totalDiscount, totalAfterCouponDiscount, totalDelivery});
}

exports.emptyCart = async(req,res) => {
    const user = await User.findOne({email:req.user.email}).exec();
    const removedcart = await Cart.findOneAndRemove({orderedBy: user._id}).exec();
    res.json({ok:true})
}

exports.saveAddress = async(req,res) => {
    const userAddress = await User.findOneAndUpdate({email:req.user.email}, {address:req.body.address}).exec()
    res.json({ok:true})
}