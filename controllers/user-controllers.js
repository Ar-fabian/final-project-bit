const { response, request } = require("express");
const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-JWT");





const userGet = async(req = request, res = response) => {
    const users = await User.find();
    const total = await User.countDocuments();
  res.json({ 
    total,
    users
  });
};

const userPost = async(req, res) => {
  const { name, email, password } = req.body;

  const user = new User( {name, email, password} );
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  const token = generateJWT( user.id );
  const { ok } = user
  await user.save();
  res.json({
    user,
    ok,
    token
  });
};


const userPut = async(req, res) => {
  const { id } = req.params;
  const {_id, password, ...rest } = req.body;
  
  if(password){
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate( id , rest );
  res.json( user );
};


const userDelete = async(req=request, res=response) => {
  const { id } = req.params;
  //Borrar fisicamente
  const user = await User.findByIdAndDelete( id )
  //cambiar el estado del usuario
  // const user = await User.findByIdAndUpdate( id, { state:false } )
    res.json({ user });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
