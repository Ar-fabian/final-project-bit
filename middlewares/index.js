


const validateReq = require('../middlewares/validate-req');
const validateJwt = require('./validate-jwt');



module.exports = {
    ...validateReq,
    ...validateJwt,
}