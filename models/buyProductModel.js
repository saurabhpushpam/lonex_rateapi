const mongoose= require("mongoose");

const buyProductSchema= mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    },
    vendor_id:{
        type: String,
        required: true
    },
    store_id:{
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
      //  required: true
    },
    name: {
        type: String,
      //  required: true
    }
});

module.exports= mongoose.model("buyProduct", buyProductSchema)