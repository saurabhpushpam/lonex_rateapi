const express= require("express");
const buy_product_routes= express();

const bodyParser= require("body-parser");
buy_product_routes.use(bodyParser.json());
buy_product_routes.use(bodyParser.urlencoded({extended: true}));

const auth= require("../middleware/auth");
const buyproductcontroller= require("../controllers/buyProductController")

buy_product_routes.post('/buy-product', auth, buyproductcontroller.buy_Product);

module.exports= buy_product_routes;