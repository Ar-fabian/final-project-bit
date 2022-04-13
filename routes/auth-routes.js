const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth-controller');
const { validateReq } = require('../middlewares/validate-req');

const router = Router();
router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validateReq
] ,login);


module.exports = router;