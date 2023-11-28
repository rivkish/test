// 7
const mongoose = require("mongoose");
const Joi = require("joi");

const cakeSchema = new mongoose.Schema({
  name:String,
  cals:Number,
  price:Number,
  img:String,
  user_id:String
})

exports.CakeModel = mongoose.model("cakes",cakeSchema);

exports.validateCake = (_reqBody) => {
  let schemaJoi = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    cals:Joi.number().min(2).max(99).required(),
    price:Joi.number().min(10).max(300000).required(),
    img:Joi.string().min(2).max(300).allow(null,"")
  })
  return schemaJoi.validate(_reqBody)
}
