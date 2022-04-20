const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    productName:{
        type:String,
        require: [true, 'El nombre del producto es obligatorio'],
        unique: true
    },
    stock:{
        type:String,
        require: [true, 'El stock del producto es obligatorio']
    },
    store:{
        type:String,
        require: [true, 'Store es obligatorio']
    }

});
ProductSchema.methods.toJSON = function() {
    const {__v,password, _id, ...product} = this.toObject();
    product.pid = _id;
    return product;
}


module.exports = model( 'Product', ProductSchema );
