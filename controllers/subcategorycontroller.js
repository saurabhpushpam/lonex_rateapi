const subCategory= require("../models/subCatogaryModel");

const create_subcategory= async(req, res) =>{

    try{

        const check_sub= await subCategory.find({ category_id: req.body.category_id });

        if(check_sub.length>0){

            let checking= false;
            for(let i=0; i<check_sub.length; i++){
                if(check_sub[i]['sub_category'].toLowerCase() === req.body.sub_category.toLowerCase()){

                    checking= true;
                    break;
                }
            }

            if (checking === false) {

                const subcatogary= new subCategory({
                    category_id: req.body.category_id,
                    sub_category: req.body.sub_category
                
                });
        
                const sub_cat_data= await subcatogary.save();
                
                res.status(200).send({success: true, msg:"sub catogary details", data: sub_cat_data});
                
            } else {

                
                res.status(200).send({success: true, msg:"This sub-category ("+req.body.sub_category+") is already exist"});
                
            }

        }
        else{
      
        const subcatogary= new subCategory({
            category_id: req.body.category_id,
            sub_category: req.body.sub_category
        
        });

        const sub_cat_data= await subcatogary.save();
        
        res.status(200).send({success: true, msg:"sub catogary details", data: sub_cat_data});

    }

    

    }
    catch (error){
        res.status(400).send({success: false, msg: error.message});
    }

}

module.exports= {
    create_subcategory
}