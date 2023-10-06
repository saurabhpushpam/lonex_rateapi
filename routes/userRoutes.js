const express= require("express");
const user_routes= express();

const auth= require("../middleware/auth");

const bodyParser= require("body-parser");
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({extended: true}));


const user_controller= require("../controllers/userController");

 user_routes.post('/register', user_controller.register_user );

 user_routes.post('/login', user_controller.user_login );

 user_routes.post('/update-password', auth, user_controller.update_password);

 user_routes.post('/forget-password', user_controller.forget_password );

 user_routes.post('/reset-password', user_controller.reset_password );

 user_routes.get('/test', auth, function(req, res){

    res.status(200).send({success:true, msg:"Authenticated"})

 });


module.exports= user_routes;