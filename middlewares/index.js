


const validateReq = require('../middlewares/validate-req');
const validateJwt = require('./validate-jwt');
const validateRols = require('./validate-roles');



module.exports = {
    ...validateReq,
    ...validateJwt,
    ...validateRols,
}