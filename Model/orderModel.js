const mongoose=require("mongoose")
const orderModel=new mongoose.Schema({
    customer_id:{
        type:String,
        required:true
    },
    Product_id:{
        type:String,
        required:true
    },
    Product_name:{
        type:String,
        required:true
    },
    Quantity:{
        type:String,
        required:true
    }
})
const orderShema=mongoose.model("order",orderModel)
module.exports=orderShema