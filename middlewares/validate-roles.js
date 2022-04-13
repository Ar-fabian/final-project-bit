const { response, request } = require("express");


const isAdminRole = ( req= request, res = response, next ) =>{
    if( !req.user ){
        return res.status(500).json({
            msg: 'Se quiere validar el rol, sin validar el token primero'
        });
    }

    const { role, name } = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(541).json({
            msg: ` ${ name } no es admin - No puede realizar esta accion`
        });
    }
    next();
} 

const hasRole = ( ...roles ) =>{

    return ( req= request, res = response, next ) => {
        if( !req.user ){
            return res.status(500).json({
                msg: 'Se quiere validar el rol, sin validar el token primero'
            });
        }
        if( !roles.includes( req.user.role)){
            return res.status(400).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}

module.exports ={
    isAdminRole,
    hasRole
}