const user= require("../models/userModel");

const bcryptjs= require('bcryptjs');

const config= require("../config/config");

const jwt= require("jsonwebtoken");

const nodemailer= require("nodemailer");

const randomstring= require("randomstring");



const create_token= async(id) =>{

    try{

        const token= await jwt.sign({_id:id }, config.secret_jwt);
        return token;

    }
    catch(error){
    res.status(400).send(error.message);
    }
}

const securePassword= async (password) => {
    try{
        const passwordHash= await bcryptjs.hash(password, 10);
        return passwordHash;
    }
     catch (error) {
       
        res.status(400).send(error.message);

     }
}

const register_user= async(req, res) =>{


    try{  

        const spassword= await securePassword(req.body.password);

        const users= new user({
             name: req.body.name,
             email: req.body.email,
             phone: req.body.phone,
             password: spassword,
             type: req.body.type


         

           // password: req.body.password,
            
            

        });



         const userData= await user.findOne({email: req.body.email});
         if(userData){
             res.status(200).send({success: false, msg: "This email is already exist"});

         }
         else{
             const user_data= await users.save();
             res.status(200).send({success: true, data: user_data});
         }

    }

    catch (error) {
        
       
        res.status(400).send(error.message);
    }
}

//login Method

 const user_login= async(req, res) => {
     try{

         const email= req.body.email;
         const password= req.body.password;


         const userData= await user.findOne({email: email});

         if(userData){

            // compare() is a function of bcryptjs, in that function we compare 2 values
            // first value "password" which user pass at the time of login
            // and second value "userData.password" means the original password stored in database

            const passwordmatch= await bcryptjs.compare(password, userData.password);

            if(passwordmatch){

                const tokenData= await create_token(userData._id);


                const userResult= {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone,
                    type: userData.type,
                    token: tokenData
                    
                }

                const response= {
                    success: true,
                    msg: "User Details",
                    data: userResult

                }

                res.status(200).send(response);

            }
            else{
                res.status(200).send({success: false, msg:"login details are incorrect"});
            }

         }
         else{
            res.status(200).send({success: false, msg:"login details are incorrect"});
         }
     }
     catch (error){
         res.status(400).send(error.message);
     }
 }


 
 // update password method

 const update_password= async(req, res) =>{
    try {
        
        const user_id= req.body.id;
        const password= req.body.password;

        const data= await user.findOne({ _id: user_id});

        if (data) {

            const newpassword= await securePassword(password);

            const userData= await user.findByIdAndUpdate({ _id: user_id}, {$set: {
                password: newpassword
            }});

            res.status(200).send({success: true, msg: "your password has been updated"});
            
        } else {
            res.status(200).send({ success: false, msg: "User id not found!"});
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
 }


// forget and reset password

 // forget password

 const sendresetpasswordmail= async(username, email, token) => {

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
            subject: 'For reset password',
            html: '<p> Hii '+username+', please copy the link <a href= "http://localhost:3000/api/reset-password?token='+token+'"> and reset your password </a>'
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

 const forget_password= async(req, res) => {

    try {
        const email= req.body.email;
        const userData= await user.findOne({email: email});
        if(userData){

            const Randomstring= randomstring.generate();
            const data= await user.updateOne({email: email}, {$set: {token: Randomstring}});
           sendresetpasswordmail(userData.name, userData.email, Randomstring);
            res.status(200).send({success: true, msg: "Please check your inbox of email and reset your password"})

        }
        else{

            res.status(200).send({success: true, msg:"This email does not exist"});

        }
        
    } catch (error) {

        res.status(200).send({success: false, msg: error.message});
        
    }

 }

 // reset password

 const reset_password= async(req, res) => {
    try {
        const token= req.query.token;
        const tokenData= await user.findOne({token: token});

        if (tokenData) {
            const password= req.body.password;
            const newpassword= await securePassword(password);
            const userdata= await user.findByIdAndUpdate({_id: tokenData._id}, {$set:{password: newpassword, token: ''}}, {new: true})

            res.status(200).send({success: true, msg: "User password has been reset", data: userdata})
        } else {
            res.status(200).send({success: true, msg: "This link is invalid"});
        }

    } catch (error) {
        res.status(200).send({success: false, msg: error.message});
    }
 }


module.exports={
    register_user,
    user_login,
    update_password,
    forget_password,
    reset_password
}