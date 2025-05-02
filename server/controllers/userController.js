const User = require("../models/user")
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = require('../config/key')

module.exports = {
    register(req,res){
        const user = req.body;
        User.create(user,(err,data)=>{
            if(err){
                return res.status(501).json({
                    success:false,
                    message:'something went wrong',
                    error:err
                })
            }
            return res.status(201).json({
                success:true,
                message: 'User Created',
                data:data,
                user:user
            })
        })
    },

    async login(req,res){
        const {email,password} = req.body;

        User.findByEmail(email, async(err,user)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:'Something went wrong!',
                    error:err   
                })
            }
            if(!user){
                return res.status(404).json({
                    success:false,
                    message:'User not found',   
                })
            }
            const isMatch = await bcyrpt.compare(password, user.password)
            if(!isMatch){
                return res.status(404).json({
                    success:false,
                    message:'Invalid credentials',   
                })
            }

            const token= jwt.sign(
                {id:user.id,email:user.email,},
                secretKey,
                {expiresIn:'1h'}
            );
            const data = {
                id:`${user.id}`,
                name:user.name,
                lastname:user.lastname,
                email:user.email,
                phone:user.phone,
                image:user.image,
                token:token,
                roles:JSON.parse(user.roles)
            }

            return res.status(200).json({
                success:true,
                message:'Login Successful',
                data:data
            })
        })
    },

    findDeliveryMen(req,res){
        User.findDeliveryMen((err,data)=>{
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