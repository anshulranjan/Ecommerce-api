const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        console.log(req.body);
        const {title, description, price, quantity, category} = req.body.values;
        req.body.slug = slugify(title);
        const{slug} = req.body;
        const newProduct = await new Product({title,slug,description,category, price, quantity, color:req.body.color, shipping:req.body.shipping}).save();
        res.json(newProduct);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({err:err.message});
    }
}