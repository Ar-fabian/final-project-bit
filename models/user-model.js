const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'La contraseña es obligatorio']
    },
    role:{
        type:String,
        required: [true, 'El rol es obligatorio'],
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    state:{
        type:Boolean,
        default: true,
    }
});

UserSchema.methods.toJSON = function() {
    const {__v,password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}





module.exports = model( 'User', UserSchema );