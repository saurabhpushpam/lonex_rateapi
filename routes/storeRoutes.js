const express= require("express");
const store_Route= express();

const bodyParser= require("body-parser");
store_Route.use(bodyParser.json());
store_Route.use(bodyParser.urlencoded({extended: true}));

const multer= require('multer');
const path= require('path');

store_Route.use(express.static('public'));

const storage= multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/storeImages'), function(error, success) {
            if(error) throw error
        })
    },

    filename: function(req, file, cb){
        const name= Date.now()+'-'+ file.originalname;
        cb(null, name, function(error, success){
            if(error) throw error
        });
    }

});

    const upload= multer({storage:storage});


const auth= require("../middleware/auth");

const store_Controller= require("../controllers/storeController");

store_Route.post('/create-store',auth,upload.single('logo'),store_Controller.create_store);

store_Route.post('/find-nearest-store', auth, store_Controller.find_store);


module.exports= store_Route;