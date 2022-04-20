const { response } = require('express');
const { request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

const validateJwt = async(req=request, res=response, next) =>{
    const token = req.header('x-token');
    if( !token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token!'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById( uid );
        if( !user ){
            return res.status(401).json({msg: 'Token no valido - usuario no existe en DB'});
        }
        req.user = user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }
}

module.exports ={
    validateJwt
}