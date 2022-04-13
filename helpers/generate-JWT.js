const jwt = require('jsonwebtoken');

const generateJWT = ( uid ='' ) =>{
    const payload = { uid };
    return jwt.sign( payload, process.env.SECRETORPRIVATEKEY);
}
// const generateJWT = ( uid ='' ) =>{

//     return new Promise( (resolve, reject)=>{
//         const payload = { uid };
//         jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
//             expiresIn: '4h'
//         }, (err, token) =>{
//             if( err ){
//                 console.log(err);
//                 reject( 'No se pudo generar el token')
//             }else{
//                 resolve( token );
//             }
//         })

//     });
    
// }


module.exports = {
    generateJWT
}