const Product = require('../models/product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        const {images,title, description, price, quantity, category, subcategory} = req.body.values;
        req.body.slug = slugify(title);
        const{slug} = req.body;
        const newProduct = await new Product({images,title,slug,description,subcategory,category, gender: req.body.gender, brand : req.body.brand, price, quantity, color:req.body.color, shipping:req.body.shipping}).save();
        res.json(newProduct);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({err:err.message});
    }
}

exports.listAll = async(req,res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subcategory')
        .sort([['createdAt', 'desc']])
        .exec();
    res.json(products);

}