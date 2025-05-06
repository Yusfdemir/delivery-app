const Address = require("../models/address");

module.exports = {

    findByUser(req,res){
        const id_user= req.params.id_user;
        const loggedInUserId = req.user.id;
        if(id_user != loggedInUserId){
            return res.status(403).json({
                success:false,
                message:"Forbidden",
            })
        }
        Address.findByUser(id_user,(err,data)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            }
            return res.status(200).json(data);
        })
    },

    create(req,res){
        const address = req.body;
        const loggedInUserId = req.user.id;
        if(address.id_user != loggedInUserId){
            return res.status(403).json({
                success:false,
                message:"Forbidden",
            })
        }
        Address.create(address,(err,id)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            }
            return res.status(200).json({
                success:true,
                message:"Address adding success",
                data: `${id}`
            })
        })
    }
}