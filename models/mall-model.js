const { Schema, model } = require('mongoose');


const MallSchema = Schema ({
    mall:String,
    store:String,
    productName:String,
    productInfo:String,
    price:String, 
    cant:Number,
    storeDescription:String,
    storeInfo:{
        webSite:String,
        timeTable:String,
        floor:String
    },
    storeImage:String,
    productDescription:String,
    productImage:String
    
})

module.exports = model('Mall', MallSchema );