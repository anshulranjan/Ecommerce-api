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

exports.remove = async(req, res) => {
    try{
        const deleted = await Product.findOneAndDelete({slug: req.params.slug});
        res.json(deleted);
    } catch(err) {
        res.status(400).send('Product cannot be deleted. Please try again');
    }
}

exports.read = async(req,res) => {
    let product = await Product.findOne({slug: req.params.slug})
        .populate('category')
        .populate('subcategory')
        .populate('brand')
        .exec();
    res.json(product);
}

exports.update = async(req, res) =>{
    try{
        const {images,title, description, price, quantity, category, subcategory, color, gender, brand, shipping} = req.body;
        const updated = await Product.findOneAndUpdate({slug: req.params.slug}, {images,title, description, price, quantity, category, subcategory, color, gender, brand, shipping, slug: slugify(title)}, {new: true});
        res.json(updated);
    } catch(err) {
        res.status(400).send('Product updation failed');
    }
}

exports.list = async(req,res) => {
    try{
        const {sort, order, page} = req.body;
        const current_page = page || 1;
        const perPage = 6;

        const products = await Product.find({})
            .skip((current_page-1)* perPage)
            .populate('category')
            .populate('subcategory')
            .sort([[sort, order]])
            .limit(perPage)
            .exec();
        res.json(products);
    }
    catch(err){
        console.log(err);
    }
}
exports.productsCount = async(req,res) =>{
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
}
