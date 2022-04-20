const { Router } = require('express');
const { check } = require('express-validator');
const { login, validateToken } = require('../controllers/auth-controller');
const { validateJwt } = require('../middlewares');
const { validateReq } = require('../middlewares/validate-req');

const router = Router();
router.post('/login',[
    check('email','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validateReq
] ,login);

router.get('/renew', validateJwt, validateToken);


module.exports = router;