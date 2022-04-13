const { response, request } = require("express");
const User = require('../models/user-model');
const bcryptjs = require('bcryptjs');




const userGet = async(req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
    const query = {state:true}
  
    const [ total, users] = await Promise.all([
      User.countDocuments( query ),
      User.find( query )
      .skip( desde )
      .limit( limite )
    ]) 
  res.json({ 
    total,
    users
  });
};

const userPost = async(req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User( {name, email, password, role} );
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.json({
    user
  });
};


const userPut = async(req, res) => {
  const { id } = req.params;
  const {_id, password, google, ...rest } = req.body;
  
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
  // const user = User.findByIdAndDelete( id )
  
  //cambiar el estado del usuario
  const user = await User.findByIdAndUpdate( id, { state:false } )
  
    res.json({ user});

};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
