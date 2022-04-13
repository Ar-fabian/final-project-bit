const Role = require('../models/role');
const User = require('../models/user-model');



const roleISValid = async(role ='') =>{
    const roleExist = await Role.findOne( {role} );
    if(!roleExist){
        throw new Error (`Èl rol ${role} no esta registrado en la BD`);
    }
}
const emailExist = async( email='')=>{
    const emailFound = await User.findOne( {email} );
    if( emailFound ) throw new Error(' El correo ya esta registrado')
}
const existUserById = async( id )=>{
    const userFound = await User.findById( id );
    if( !userFound ) throw new Error(`El id: ${ id } no existe`);
}


module.exports = {
    roleISValid,
    emailExist,
    existUserById
}