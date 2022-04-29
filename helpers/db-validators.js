const { request, response } = require('express');
const User = require('../models/user-model');



const emailExist = async( email='')=>{
    const emailFound = await User.findOne( {email} );
    if( emailFound ) throw new Error(' El correo ya esta registrado')
}


const existUserById = async( id )=>{
    const userFound = await User.findById( id );
    if( !userFound ) throw new Error(`El id: ${ id } no existe`);
}



module.exports = {
    emailExist,
    existUserById,
}