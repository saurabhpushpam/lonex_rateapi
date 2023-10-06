const express= require('express');
const app= express();

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/ecomm");


// user routes

const user_route= require("./routes/userRoutes");

 app.use('/api', user_route);

// store routes

const store_routes= require("./routes/storeRoutes");
app.use('/api', store_routes);


//catogary routes

const category_routes= require("./routes/categoryRoutes");
app.use('/api', category_routes);

// sub-catogary routes

const subcategory_route= require("./routes/subCategoryRoutes");
app.use('/api', subcategory_route);


// Add-product routes

const product_routes= require("./routes/productRoutes");
app.use('/api', product_routes);



// buy product routes

const buy_product_routes= require("./routes/buyProductRoutes");
app.use('/api', buy_product_routes);

// review product routes

const reviewapi= require("./routes/reviewRoutes");
app.use('/api', reviewapi);



// get api

app.get('/getapi', (req, res) => {
   
    
    res.send('server is running at render get api');
  
});

// post api


    app.post('/user', function (req, res) {
        console.log(req.body);
        console.log(req.body.username);
        res.send(req.body.username);

    });
   
 
   


app.listen(3000, function(){
    console.log('server is running');
});

