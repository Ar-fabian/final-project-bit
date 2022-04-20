const { request, response } = require('express');
const Product = require('../models/product-model');


const productlist = async(req = request, res = response ) => {
    const query = req.query

    const products = await Product.find( query );
    const total = await Product.countDocuments( query ) 
  res.json({ 
    total,
    products,
    ok:true
  });
};
const productById = async(req = request, res = response ) => {
    const { id } = req.params;

    const product = await Product.findById( id );
  res.json({ 
    product,
    ok:true
  });
};
const productGet = async( req = request, res = response ) => {
    const products = await Product.find( )
    const total = await Product.countDocuments() 
  res.json({ 
    total,
    products,
    ok:true
  });
};


const productPost = async(req, res) => {
    const { productName, stock, store } = req.body;
    const product = new Product( { productName, stock, store } );

    await product.save();
    res.json({
        product,
        msg:'Producto cargado',
        ok:true
    });
};

const productPut = async(req = request, res) => {
    const { id } = req.params;
    const productNameInBd = await Product.findById( id );

    if( req.body.productName !== productNameInBd.productName){
        const productFound = await Product.findOne( {productName:req.body.productName} );
        if( productFound ) {
          res.json({msg:'El producto ya esta registrado', ok:false});
        }else{
          const {...rest } = req.body;

          const product = await Product.findByIdAndUpdate( id , rest );
          res.json( {
            product,
            msg: 'Producto actualizado',
            ok:true
          } );
        }
    }else{
      const {...rest } = req.body;

          const product = await Product.findByIdAndUpdate( id , rest );
          res.json( {
            product,
            msg: 'Producto actualizado',
            ok:true
          } );
    }
    
};

const productDelete = async(req=request, res=response) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete( id );
    res.json({ 
      product,
      msg:'Producto borrado',
      ok:true
    });
};


module.exports = {
    productGet,
    productPost,
    productPut,
    productDelete,
    productlist,
    productById
  };