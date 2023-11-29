const mongoose=require("mongoose")
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {config} =require("../config/secret.js")

let userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    date_created:{
        type:Date,default:Date.now()
    },
    role:{
        type:String,default:"user"
    }
})
exports.UserModel=mongoose.model("users",userSchema)

exports.validateUser=(_reqbody)=>{
    let joiSchema=Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(4).max(50).required(),
        date_created: Joi.date().allow()
    })

    return joiSchema.validate(_reqbody)
}
exports.createToken=(_id,role)=>{
    let token=jwt.sign({_id,role},config.tokenSecret,{expiresIn:"60mins"})
    return token
  
  }

exports.loginValid=(_reqbody)=>{
    let joiSchema=Joi.object({
        email: Joi.string().min(2).max(100).email().required(),
        password: Joi.string().min(4).max(50).required(),
    })

    return joiSchema.validate(_reqbody)
}


