const { Router } = require("express");
const { check } = require('express-validator');

const { validateReq } = require('../middlewares');

const { productGet, productPost, productPut, productDelete, productlist, productById } = require("../controllers/product-controller");
const { existProductById, productExist } = require("../helpers/db-validators");
const router = Router();



router.get('/', productGet);

router.get('/byId/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existProductById ),
    validateReq
], productById);

router.get('/list', productlist);


router.post('/',[
    check('productName','Debe ingresar un producto').not().isEmpty(),
    check('stock','Debe ingresar el stock').not().isEmpty(),
    check('productName').custom( productExist ),
    validateReq
] ,productPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existProductById ),
    check('productName','Debe ingresar un producto').not().isEmpty(),
    check('stock','Debe ingresar el stock').not().isEmpty(),
    validateReq
] ,productPut);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existProductById ),
    validateReq
], productDelete );

module.exports = router;