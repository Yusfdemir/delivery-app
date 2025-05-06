const Product=require("../models/product")

module.exports={
    findByCategory(req,res){
        const id_category = req.params.id_category;
        Product.findByCategory(id_category,(err,data)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            }
            return res.status(200).json(data)
        })
    },

    findByNameAndCategory(req,res){
        const id_category = req.params.id_category;
        const name = req.params.name;
        Product.findByNameAndCategory(name,id_category,(err,data)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            }
            return res.status(200).json(data)
        })
    }
}