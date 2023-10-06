const mongoose= require("mongoose");

const reviewSchema= mongoose.Schema({
    email: {
        type: String
        
    },
    buyproduct_id: {
        type: String
        
    },

    name: {
        type: String
    },
    
    ratings: {
        type: Number
        
    },
   
    feedback: {
        type: String
    }
});

module.exports= mongoose.model("review", reviewSchema);