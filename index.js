const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const ejs=require("ejs")
const customerModel=require("./Model/customerModel")
const orderModel=require("./Model/orderModel")
const productModel=require("./Model/productModel")
const app=express()
app.listen(process.env.PORT, (err)=>{
    if(!err){
        console.log(`server connected on port ${process.env.PORT}`)
    }else{
        console.log(err)
    }
})
mongoose.connect(process.env.MONGODB, (err)=>{
    if(!err){
        console.log("Database Connected Successfully")
    }else{
        console.log(err)
    }
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.get("/productTable",(req,res)=>{
    productModel.find().then((product)=>{
        res.render("product",{product})
    })
})
app.post("/product",(req,res)=>{

    productModel.create({
        product_id:req.body.product_id,
        product_Type:req.body.product_Type,
        product_Name:req.body.product_Name,
        product_Price:req.body.product_Price,
        product_Quantity:req.body.product_Quantity
    }).then((data)=>{
        console.log(data)
        res.status(200).send("Data posted")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })

})
app.get("/product/:product_type", async (req,res)=>{
    let data = await productModel.findOne({id : req.params.product_type});
    try{
        res.json({
            status : "success",
            data : data,
        })
    }catch(err){
        res.json({
            status : "failure",
            message : err.message
        })
    }
})
app.post("/customer",(req,res)=>{
    customerModel.create({
        customer_id:req.body.customer_id,
        customer_name:req.body.customer_name,
        email:req.body.email,
        balance:req.body.balance
    }).then((data)=>{
        res.status(200).send("data created")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})
app.get("/customer/:customer_id", async (req,res)=>{
    let data = await customerModel.findOne({id : req.params.customer_id});
    try{
        res.json({
            status : "success",
            data : data,
        })
    }catch(err){
        res.json({
            status : "failure",
            message : err.message
        })
    }
})
app.get("/customerTable",(req,res)=>{
    customerModel.find().then((customer)=>{
        res.render("customer",{customer})
    })
})
app.post("/order",(req,res)=>{
    orderModel.create({
        customer_id:req.body.customer_id,
        Product_id:req.body.Product_id,
        Product_name:req.body.Product_name,
        Quantity:req.body.Quantity
    }).then((data)=>{
        res.status(200).send("order Placed successfully")
    }).catch((err)=>{
        res.status(400).send(err.message)
    })
})
app.get("/order/:order_id", async (req,res)=>{
    let data = await orderModel.findOne({p_id : req.params.order_id});
    try{
        res.json({
            status : "success",
            data : data,
        })
    }catch(err){
        res.json({
            status : "failure",
            message : err.message
        })
    }
})
app.get("/orderTable",(req,res)=>{
    orderModel.find().then((order)=>{
        res.render("order", {order})
    })
})
app.get("/product/electonics",(req,res)=>{
    inventoryModel.find({product_Type:"Electronics"}).then((Electronics)=>{
        console.log(Electronics)
        res.status(200).render("electronics",{Electronics})
    }).catch((err)=>{
        console.log(err)
    })
})
app.get("/product/furniture",(req,res)=>{
    inventoryModel.find({product_Type:"Furniture"}).then((furn)=>{
        console.log(furn)
        res.status(200).render("furnitures",{furn})
    }).catch((err)=>{
        console.log(err)
    })
})

