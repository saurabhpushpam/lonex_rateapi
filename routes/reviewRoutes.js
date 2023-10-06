const express= require("express");
const review_routes= express();

const bodyParser= require("body-parser");
review_routes.use(bodyParser.json());
review_routes.use(bodyParser.urlencoded({extended: true}));


review_routes.set('view engine', 'ejs');
review_routes.set('views', "./views/users");

const auth= require("../middleware/auth");

const ratecontroller= require("../controllers/rateController");



review_routes.post('/rating', ratecontroller.reviewp);

review_routes.get('/feedback', ratecontroller.loadregister);

review_routes.post('/feedback', ratecontroller.insertreview);

module.exports= review_routes;