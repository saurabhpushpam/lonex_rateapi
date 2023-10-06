const userregister= require("../models/reviewModel");

const config= require("../config/config");

const nodemailer= require("nodemailer");

const Productmodel= require("../models/productModel");

const ReviewProduct= require("../models/reviewModel");
const userbuy= require("../models/buyProductModel");



const sendreview= async(username, email, token) => {

    try {
         const transporter= nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOption= {
            from: config.emailUser,
            to: email,
            subject: 'For your feedback',
            html: '<p> Hii '+username+', please click on the link <a href= "http://localhost:3000/api/feedback"> and give your feedback </a>'
        }

        transporter.sendMail(mailOption, function(error, info){
            if(error){
                console.log(error);

            }
            else{
                console.log("Mail has been sent : ", info.response);
            }
        });



    } catch (error) {
        res.status(400).send({success: false, msg: error.message});
    }
 }

 

const reviewp= async(req, res) => {

    try {
        const email= req.body.email;
        const userData= await userbuy.findOne({email: email});
        if(userData){

            sendreview(userData.name, userData.email);
            res.status(200).send({success: true, msg: "Please check your inbox of email and give feedback"})

        }
        else{

            res.status(200).send({success: true, msg:"This email does not exist"});

        }
        
    } catch (error) {

        res.status(200).send({success: false, msg: error.message});
        
    }

 }

 const loadregister= async(req, res) =>{
    try{
        res.render('feedback');
    }catch(error){
        console.log(error.message);
    }
}


const insertreview= async(req, res) =>{
    try {

        const rating= req.body.rating;
        if(rating<0 || rating>5){
           res.render('feedback', {message:" rating should be 0 to 5"});
        }



        else{

            const buyproductid= req.body.buyProductId;
            const bdata= await userbuy.findOne({_id: buyproductid});

        if(bdata){

            const e= bdata.email;
            const email= req.body.email;
                
            if(e == email){

                 const buyproduct= req.body.buyProductId;
                 const fdata= await userregister.findOne({buyproduct_id: buyproduct});
            
                if(fdata){

                   res.render('feedback', {message:" you already submitted your review"});
                }

                else{

                    const user= new userregister({
                    name: req.body.name,
                    email: req.body.email,
                    ratings: req.body.rating,
                    feedback: req.body.feedback,
                    buyproduct_id: req.body.buyProductId,
            

                });


                    const userdata= await user.save();

                    if(userdata){
                        res.render('feedback', {message:" your feedback has been successfully submitted"});

                    }
                    else{
                        
                        res.render('feedback', {message:" your feedback submission has been failed"});
                    }
                }
            }
        
            else{
            
                res.render('feedback', {message:" buyproductID and email does not match"});
            
            }
        }   
        else{
        
            res.render('feedback', {message:" buyproductID not valid"});
    
        } 
  }  

    } catch (error) {
         console.log(error.message);
    }
}



    module.exports= {
        
        loadregister,
        reviewp,
        insertreview
       
    }
   
  