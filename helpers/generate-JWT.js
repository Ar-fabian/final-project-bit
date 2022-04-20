const jwt = require('jsonwebtoken');

const generateJWT = ( uid ='' ) =>{
    const payload = { uid };
    return jwt.sign( payload, process.env.SECRETORPRIVATEKEY);
}



module.exports = {
    generateJWT
}