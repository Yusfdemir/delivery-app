const Category = require("../models/category");
const roles = require("../models/roles");

module.exports = {
    create(req,res){
        const userId = req.user.id;
        roles.hasRole(userId,'RESTAURANT',(err,hasRestaurantRole)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            }
            if(!hasRestaurantRole){
                return res.status(403).json({
                    success:false,
                    message:"Permission denied",
                    
                })
            }

            const category = req.body;
            Category.create(category,(err,id)=>{
                if(err){
                    return res.status(500).json({
                        success:false,
                        message:"Something went wrong",
                        error:err
                    })
                }
                return res.status(200).json({
                    success:true,
                    message:"Category adding success",
                    data: `${id}`
                })
            })
        })

        
    },

    getAll(req,res){
        Category.getAll((err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message:'Something went wrong',
                    error:err
                })
            }
            return res.status(200).json(data)
        })
    }

}