const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name: String,
    email:{
        type: String,
        required: true,
        index: true
    },
    role:{
        type: String,
        default: "subscriber"
    },
    cart:{
        type: Array,
        default: []
    },
    address: String,
    contact: String
    //wishlist:[{type:ObjectId, ref:"Product"}]

}, {timestamps: true}
);
module.exports = mongoose.model('User',userSchema);