const { validationResult } = require("express-validator");


const validateReq = ( req,res,next ) =>{
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.json( { msg:errors.errors[0].msg, ok:false} );
    }
    next();
}



module.exports = {
    validateReq
}