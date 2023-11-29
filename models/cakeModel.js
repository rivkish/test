// 7
const mongoose = require("mongoose");
const Joi = require("joi");

const cakeSchema = new mongoose.Schema({
  name:String,
  cals:Number,
  price:Number,
  img:{
    type:String,default:"https://png.pngtree.com/png-vector/20190628/ourmid/pngtree-cake-icon-for-your-project-png-image_1519993.jpg"
  },
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  },
  category_id:{
    type:String,default:"1"
  }
})

exports.CakeModel = mongoose.model("cakes",cakeSchema);

exports.validateCake = (_reqBody) => {
  let schemaJoi = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    cals:Joi.number().min(2).max(300).required(),
    price:Joi.number().min(1).max(300000).required(),
    img:Joi.string().min(2).max(300).allow(null,"")
  })
  return schemaJoi.validate(_reqBody)
}
