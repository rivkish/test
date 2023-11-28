const mongoose=require("mongoose")
const Joi = require("joi");
const jwt = require("jsonwebtoken");


let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date_created:{
        type:Date,default:Date.now()
    }
})
exports.UserModel=mongoose.model("users",userSchema)

exports.validateUser=(_reqbody)=>{
    let joiSchema=Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(2).max(50).required(),
        date_created: Joi.date().allow()
    })

    return joiSchema.validate(_reqbody)
}
exports.createToken=(user_id)=>{
    let token=jwt.sign({_id:user_id},"rivSecret",{expiresIn:"60mins"})
    return token
  
  }

exports.loginValid=(_reqbody)=>{
    let joiSchema=Joi.object({
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(6).max(50).required(),
    })

    return joiSchema.validate(_reqbody)
}


