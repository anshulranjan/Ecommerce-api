const Category = require('../models/category');
const slugify = require('slugify');
const SubCategory = require('../models/subcategory')
const Brand = require('../models/brand');
const Product = require('../models/product');

exports.create = async(req,res) => {
    try{
        const {name} = req.body;
        const category = await new Category({name, slug: slugify(name).toLowerCase()}).save();
        res.json(category); 
    } catch(err) {
        res.status(400).send('Sorry, Category creation failed');
    }
}

exports.list = async(req,res) => {
    res.json(await Category.find({}).sort({createdAt:-1}).exec());
}

exports.read = async(req,res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
}

exports.update = async(req,res) => {
    const {name} = req.body;
    try{
        const updated = await Category.findOneAndUpdate({slug: req.params.slug}, {name, slug: slugify(name)}, {new: true});
        res.json(updated);
    } catch(err) {
        res.status(400).send('Category updation failed');
    }
}

exports.remove = async(req,res) => {
    try{
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        await SubCategory.deleteMany({parent:deleted._id})
        await Brand.deleteMany({parentCat:deleted._id})
        await Product.deleteMany({category:deleted._id})
        console.log(deleted)
        res.json(deleted);
    } catch(err) {
        console.log(err)
        res.status(400).send('Category cannot be deleted. Please try again');
    }
    
}

exports.getSubCategories = async(req,res) => {
    SubCategory.find({parent:req.params._id}).exec((err, subs) =>{
        if(err)
        {
            console.log(err);
        }
        res.json(subs);
    })
};

exports.productCountWithCategory = async(req,res) =>{
    let total = await Product.find({category:req.params._id}).estimatedDocumentCount().exec();
    console.log(total);
    res.json(total);
};