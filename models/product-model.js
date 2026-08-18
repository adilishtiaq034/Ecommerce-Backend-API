const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

           name:{
                   type:String,
                   required:true,
                   unique:true,
                   trim:true

           },
           price:{
                   type:Number,
                   required:true,
                   min:0
           },
           description:{
                   type:String,
                   required:true,
                   maxlength:200
           },
           category:{
                   type:String,
                   required:true
           },
           stock:{
                type:Number,
                required:true,
                min:0
           },
            images:[{
                type:String,
                required:true
            }]},
{ 
    timestamps : true
})

const Product = mongoose.model("Product",productSchema)

module.exports = Product