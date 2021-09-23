const Brand = require('../models/brand');
const slugify = require('slugify');
const SubCategory = require('../models/subcategory');
const Category = require('../models/category')

exports.create = async(req,res) => {
    try{
        const {name, parentCat, parentSub} = req.body;
        const brand = await new Brand({name, parentCat, parentSub, slug: slugify(name).toLowerCase()}).save();
        res.json(brand); 
    } catch(err) {
        res.status(400).send('Sorry, Brand creation failed. Make sure brand name is unique');
    }
}

exports.list = async(req,res) => {
    res.json(await Brand.find({}).sort({createdAt:-1}).exec());
}

exports.read = async(req,res) => {
    let brand = await Brand.findOne({_id: req.params._id}).exec();
    res.json(brand);
}

exports.update = async(req,res) => {
    const {name, parentCat, parentSub} = req.body;
    try{
        const updated = await Brand.findOneAndUpdate({_id: req.params._id}, {name, parentCat, parentSub, slug: slugify(name)}, {new: true});
        res.json(updated);
    } catch(err) {
        res.status(400).send('Brand updation failed. Brand name should be unique');
    }
}

exports.remove = async(req,res) => {
    try{
        const deleted = await Brand.findOneAndDelete({_id: req.params._id});
        res.json(deleted);
    } catch(err) {
        res.status(400).send('Brand cannot be deleted. Please try again');
    }
}

