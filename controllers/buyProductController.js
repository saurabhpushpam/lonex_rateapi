const BuyProduct= require("../models/buyProductModel");

const buy_Product= async(req, res) =>{

    try{

        const buyProduct= new BuyProduct({
            email: req.body.email,
            name: req.body.name,
            product_id: req.body.product_id,
            transaction_id: req.body.transaction_id,
            vendor_id: req.body.vendor_id,
            store_id: req.body.store_id,
            customer_id: req.body.customer_id

        });

        const buyproductdata= await buyProduct.save();
        res.status(200).send({success: true, msg: "Buy product details" , data: buyproductdata})

    }catch(error){

        res.status(400).send({success: false, msg: error.message});
    }

}

module.exports= {
    buy_Product
}