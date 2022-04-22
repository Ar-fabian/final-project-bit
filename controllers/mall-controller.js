const { request, response } = require('express');
const Mall = require('../models/mall-model');



const mallPost = async(req, res) => {
    const mall = req.body;
    const product = new Mall( mall );

    await product.save();
    res.json({
        mall,
        msg:'Centro comercial registrado',
        ok:true
    });
};

const dataGet = async( req = request, res = response ) => {
    const malls = await Mall.find( )
    const total = await Mall.countDocuments() 
  res.json({ 
    total,
    malls,
    ok:true
  });
};
const mallGet = async( req = request, res = response ) => {
    const { mall } = req.params;
    const malls = await Mall.find( {mall} );
  res.json({ 
    malls,
    ok:true
  });
};
const productGet = async( req = request, res = response ) => {
    const { product } = req.params;
    const malls = await Mall.find( {"productName":product});
  res.json({ 
    malls,
    ok:true
  });
};

const budget = async(req = request, res = response)=>{
  const { mall, productName } = req.query;
  const [product] = await Mall.find({mall , productName});
  res.json({
    ok:true,
    product
  })
}

module.exports ={
    mallPost,
    dataGet,
    mallGet,
    productGet,
    budget
}