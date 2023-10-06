var mongoose= require("mongoose");

const productSchema= mongoose.Schema({
    vendor_id:{
        type: String,
        required: true
    },

    store_id:{
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price:{
        type: String,
        required: true
    },

    discount: {
        type: String,
        required: true
    },

    category_id: {
        type: String,
        required: true
    },

    rating: {
        type: Number
    },

    user: {
        type: Number
    },

    feedback:{
        type: Array
    },

    images:{
        type: Array,
        required: true,
        validate: [arrayLimit, "you can pass upto 8 product images"]

    }
});

function arrayLimit(val){
    return val.length <= 8;
}


module.exports= mongoose.model("product", productSchema);