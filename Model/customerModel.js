const mongoose=require("mongoose")
const customerModel=new mongoose.Schema({
    customer_id:{
        type:String,
        required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    balance:{
        type:Number
    }
    
})
const customerSchema=mongoose.model("customer",customerModel)
module.exports=customerSchema