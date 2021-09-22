const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const subcategorySchema = new Schema({
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
    parent: {type: ObjectId, ref: "Category", required: true},

},{timestamps: true}
);
module.exports = mongoose.model('SubCategory', subcategorySchema);