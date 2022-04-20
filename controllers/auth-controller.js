const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user-model');
const { generateJWT } = require("../helpers/generate-JWT");


const login = async( req, res=response ) =>{
    const { email, password} = req.body;
    try {
        const user = await User.findOne( { email } );
        if(!user) return res.json({
             msg: 'email/password no son correctos',
             ok: false
        });
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) return res.json({ 
            msg: 'email/password no son correctos',
            ok:false
        });


        const token = generateJWT( user.id );
        const { ok } = user
        res.json({
            user,
            ok,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const validateToken = ( req, res= response) =>{
        const user = req.user;
        const token = req.header('x-token');
    return res.json({
        ok:true,
        msg:'renew',
        user,
        token
    })
}


module.exports = {
    login,
    validateToken
}