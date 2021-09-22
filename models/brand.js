const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const brandSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    slug:{
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    parentCat: {type: ObjectId, ref: "Category", required: true},
    parentSub: {type: ObjectId, ref: "SubCategory", required: true},

},{timestamps: true}
);
module.exports = mongoose.model('Brand', brandSchema);