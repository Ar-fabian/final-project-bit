const { request, response } = require('express');
const Product = require('../models/product-model');
const User = require('../models/user-model');



const emailExist = async( email='')=>{
    const emailFound = await User.findOne( {email} );
    if( emailFound ) throw new Error(' El correo ya esta registrado')
}
const productExist = async( productName='')=>{
    const productFound = await Product.findOne( { productName } );
    if( productFound ) throw new Error(' El producto ya esta registrado')
}


const existUserById = async( id )=>{
    const userFound = await User.findById( id );
    if( !userFound ) throw new Error(`El id: ${ id } no existe`);
}
const existProductById = async( id )=>{
    const productFound = await Product.findById( id );
    if( !productFound ) throw new Error(`El id: ${ id } no existe`);
}


module.exports = {
    emailExist,
    existUserById,
    existProductById,
    productExist,
}