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
    for(let i=0;i<cart.length; i++)
    {
        let object = {}
        object.product = cart[i]._id;
        object.count = cart[i].count;
        let { price } = await Product.findById(cart[i]._id).select("price").exec();
        object.price = parseInt(price);
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
        orderedBy: user._id,
    }).save();
    res.json({ok:true})

}