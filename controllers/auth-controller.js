const { response } = require("express");
const bcryptjs = require('bcryptjs');
const User = require('../models/user-model');
const { generateJWT } = require("../helpers/generate-JWT");


const login = async( req, res=response ) =>{
    const { email, password} = req.body;
    try {
        const user = await User.findOne( { email } );
        if(!user) return res.json( { msg: 'email/password no son correctos - email'} );

        if(!user.state) return res.json( { msg: 'email/password no son correctos - estado:false'} );
        
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword) return res.json( { msg: 'email/password no son correctos - password'} );


        const token = generateJWT( user.id );
        res.json({
            user,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}


module.exports = {
    login
}