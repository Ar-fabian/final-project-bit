const { Router } = require('express');
const { check } = require('express-validator');

const { validateReq, validateJwt, isAdminRole, hasRole } = require('../middlewares');

const { userGet, userPut, userPost, userDelete } = require('../controllers/user-controllers');
const { roleISValid, emailExist, existUserById } = require('../helpers/db-validators');
const router = Router();

router.get('/', userGet);
router.post('/',[
    check('name','Debe ingresar un nombre').not().isEmpty(),
    check('email','El correo no es valido').isEmail(),
    check('email').custom( emailExist ),
    check('password','La contraseña debe contener minimo 6 caracteres').isLength({ min:6 }),
    // check('role',' No es un rol valido ').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( roleISValid ),
    validateReq
], userPost );

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( roleISValid ),
    validateReq
], userPut );

router.delete('/:id',[
    validateJwt,
    // isAdminRole,
    hasRole('ADMIN_ROLE','SALES_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existUserById ),
    validateReq
], userDelete );





module.exports = router;