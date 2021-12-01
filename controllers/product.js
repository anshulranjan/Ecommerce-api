const Product = require('../models/product');
const slugify = require('slugify');
const User = require('../models/user');

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

exports.productStar = async(req,res) => {
    let product = await Product.findById(req.params.productId).exec();
    const user = await user.findOne({email: req.user.email}).exec();
    const {star} = req.body;
    let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id);

    if(existingRatingObject === undefined)
    {
        let ratingadded = await Product.findByIdAndUpdate(product._id, {
            $push: { ratings: {star: star, postedBy: user._id} },
            }, {new: true}).exec();
        res.json(ratingadded);
    } else{
        const ratingUpdated = await Product.updateOne(
            {ratings: { $elemMatch : existingRatingObject}},
            {$set: {"ratings.$.star": star}},
            {new: true}).exec();
        res.json(ratingUpdated);
    }
};

exports.readCategoryProduct = async(req,res) =>{
    const product = await Product.findById(req.params.productId).exec();
    const relatedCategory = await Product.find({
        _id :{$ne : product._id},
        category: product.category,
    }).limit(6)
    .populate('category')
    .populate('subcategory').exec();
    res.json(relatedCategory);
};

exports.readSubProduct = async(req,res) =>{
    const product = await Product.findById(req.params.productId).exec();
    try{
        const relatedCategory = await Product.find({
            _id :{$ne : product._id},
            subcategory: product.subcategory,
            }).limit(6)
            .populate('category')
            .populate('subcategory').exec();
            res.json(relatedCategory);
    }
    catch(err){
        console.log(err)
    }   
};

//read by subcategory
exports.extractProductBySubs = async(req,res) =>{
    try{
        const {page} = req.body;
        const current_page = page || 1;
        const perPage = 12;
        const total = await Product.find({subcategory: req.params.subcategoryId}).count().exec();
        const products = await Product.find({subcategory: req.params.subcategoryId})
            .skip((current_page-1)* perPage)
            .populate('category')
            .populate('subcategory')
            .limit(perPage)
            .exec();
        res.json({products, count:total});
    }
    catch(err){
        console.log(err);
    }

};
//read by category
exports.extractProductByCategory = async(req,res) =>{
    try{
        const {page} = req.body;
        const current_page = page || 1;
        const perPage = 12;
        const total = await Product.find({category: req.params.categoryId}).count().exec();
        const products = await Product.find({category: req.params.categoryId})
            .skip((current_page-1)* perPage)
            .populate('category')
            .populate('subcategory')
            .limit(perPage)
            .exec();
        res.json({products, count: total});
    }
    catch(err){
        console.log(err);
    }
};

//FILTRS ---------------------------------------------------------

const handlePrice = async (req,res, price) => {
    try{
        let products = await Product.find({
            price : {
                $gte: price[0],
                $lte: price[1]
                },
            })
            .populate('category', "_id name")
            .populate('subcategory', "_id name")
            .populate('brand', "_id name")
            .exec();
        res.json(products);
    }
    catch (err){
        console.log(err);
    }
}
const handleQuery = async(req,res,query) =>{
    const products = await Product.find({ $text : {$search : query}})
        .populate('category', "_id name")
        .populate('subcategory', "_id name")
        .populate('brand', "_id name")
        .exec();
    res.json(products);
};

exports.searchFilters = async(req,res) =>{
    const {query, price} = req.body;
    if(query)
    {
        console.log(query);
        await handleQuery(req,res, query);
    }
    //price [0, 2000] mostly come in array
    if(price !== undefined)
    {
        await handlePrice(req,res,price)

    }
}
