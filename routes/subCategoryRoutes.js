const express= require("express");
const subcategory_route= express();

const bodyparser= require("body-parser");
subcategory_route.use(bodyparser.json());
subcategory_route.use(bodyparser.urlencoded({extended: true}));

const auth= require("../middleware/auth");

const subcategory_controller= require("../controllers/subcategorycontroller");

subcategory_route.post("/add--sub--category", auth, subcategory_controller.create_subcategory);

module.exports= subcategory_route;