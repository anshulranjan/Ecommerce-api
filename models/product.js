const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const productSchema = new Schema({
    title:{
        type: String,
        trim: true,
        required: true,
        text: true,
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    description:{
        type: String,
        required: true,
        text: true,
    },
    price:{
        type: Number,
        required: true,
        trim: true,
    },
    discount:{
        type: Number,
        trim: true,
    },
    delivery:{
        type: Number,
        trim: true,
    },
    category: {type: ObjectId, ref: "Category", required: true},
    subcategory: {type: ObjectId, ref: "SubCategory", required: true},
    brand: {type: ObjectId, ref: "Brand", required: true},
    quantity: {
        type:Number,
    },
    sold:{
        type:Number,
        default:0,
    },
    gender:{
        type:String,
        required:true,
    },
    images:{type: Array},
    shipping:{
        type:String,
        enum:["Yes","No"],
    },
    color:{
        type:String,
        enum:["Black","Red","Green","Silver","White","Blue","Yellow","Grey"],
    },
    ratings:[{
        star:Number,
        postedBy:{type:ObjectId, ref:"User"},
    }],
},{timestamps: true}
);
module.exports = mongoose.model('Product', productSchema);