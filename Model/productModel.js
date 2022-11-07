const mongoose=require("mongoose")
const productModel=new mongoose.Schema({
    product_id:{
        type:String,
        required:true
    },
    product_Type:{
        type:String,
        required:true
    },
    product_Name:{
        type:String,
        required:true
    },
    product_Price:{
        type:Number,
        required:true
    },
    product_Quantity:{
        type:Number,
        required:true
    }
})
const productSchema=mongoose.model("product", productModel)
module.exports=productSchema