const SubCategory = require('../models/subcategory');
const slugify = require('slugify');
const Brand = require('../models/brand');
const Product = require('../models/product')
exports.create = async(req,res) => {
    try{
        const {name, parent} = req.body;
        const subcategory = await new SubCategory({name, parent, slug: slugify(name).toLowerCase()}).save();
        res.json(subcategory); 
    } catch(err) {
        res.status(400).send('Sorry, SubCategory creation failed');
    }
}

exports.list = async(req,res) => {
    res.json(await SubCategory.find({}).sort({createdAt:-1}).exec());
}

exports.read = async(req,res) => {
    let subcategory = await SubCategory.findOne({slug: req.params.slug}).exec();
    res.json(subcategory);
}

exports.update = async(req,res) => {
    const {name, parent} = req.body;
    try{
        const updated = await SubCategory.findOneAndUpdate({slug: req.params.slug}, {name, parent, slug: slugify(name)}, {new: true});
        res.json(updated);
    } catch(err) {
        console.log(err);
        res.status(400).send('SubCategory updation failed. Subcategory name should always be unique.');
    }
}

exports.remove = async(req,res) => {
    try{
        const deleted = await SubCategory.findOneAndDelete({slug: req.params.slug});
        await Brand.deleteMany({parentSub:deleted._id})
        await Product.deleteMany({subcategory:deleted._id})
        res.json(deleted);
    } catch(err) {
        res.status(400).send('SubCategory cannot be deleted. Please try again');
    }
    
}

exports.getSubBrand = async(req,res) => {
    Brand.find({parentSub:req.params._id}).exec((err, subs) =>{
        if(err)
        {
            console.log(err);
        }
        res.json(subs);
    })
};