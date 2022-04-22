const { Schema, model } = require('mongoose');


const MallSchema = Schema ({
    mall:String,
    store:String,
    'productName':String,
    'price':String, 
    'cant':Number,
    storeDescription:String
    
})

module.exports = model('Mall', MallSchema );