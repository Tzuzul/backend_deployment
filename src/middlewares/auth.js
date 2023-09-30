const {expressjwt: expressJWT} = require('express-jwt')
const { jwtKey } = require('../config')

const getToken = (req)=>{
    const {authorization} = req.headers

    if(authorization){
        const [type, token] = authorization.split(' ') // ['Bearer', 'eyJH....']

        return type==='Bearer' || type==='Token' ? token : null
    }

    return null
}

const auth = expressJWT({
    secret: jwtKey,
    algorithms: ['HS256'],
    userProperty: 'user',
    getToken
})

const handleAuthError = (error, req, res, next)=>{
    if (error.name === "UnauthorizedError") {
        return res.status(401).json({
            success:false,
            message:'Unauthorized'
        });
    } else {
        next(err);
    }
}

module.exports = {auth, handleAuthError}