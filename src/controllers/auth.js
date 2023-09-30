const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config')
const User = require('../models/User')
const bcrypt = require('bcrypt')

const login = async (req, res)=>{
    const {email, password} = req.body
    console.log(email, password)

    if(!(email && password)){
        return res.status(400).json({
            success:false,
            message: 'No se proporcionaron las credenciales'
        })
    }

    //consultar el usuario desde la BD
    const user = await User.findOne({email})
    console.log(user)

    if(email===user.email && bcrypt.compareSync(password, user.password)){
        const userJSON = user.toJSON()
        delete userJSON.password
        // const token = jwt.sign({
        //     data:userReplica,
        //     exp: Math.floor(Date.now() / 1000) + (60 * 60)
        // }, jwtKey)
        const token = jwt.sign(userJSON, jwtKey, {expiresIn: '7d'})

        return res.json({
            success:true,
            message: 'Usuario loggeado correctamente',
            token,
            data: userJSON
        })
    }

    return res.status(400).json({
        success:false,
        message: 'Las credenciales no coinciden'
    })

}

const signUp = async (req, res)=>{
    try {
        const user = new User(req.body)
        const validationResult = user.validateSync();

        if(validationResult?.errors){
            return res.status(400).json({
                success: false, 
                message: Object.keys(validationResult.errors).map((key)=>{return {property:key, message:validationResult.errors[key].message}}),
            })
        }

        user.hashPassword(req.body.password)
        const userSaved = (await user.save()).toJSON()
        delete userSaved.password
        return res.json({
            success: true, 
            message: 'Usuario registrado exitosamente',
            data: userSaved
        })
    } catch (error) {
        console.log('Catch', error)
        if(error.code===11000){
            return res.status(400).json({
                success: false, 
                message: 'Usuario ya registrado',
            })
        }else{
            return res.status(400).json({
                success: false, 
                message: 'Ocurrio un error. Intenta mas tarde.',
            })
        }
    }
}

const recover = (req, res)=>{
    return res.json({
        success:true,
        data: req.auth
    })
}

module.exports = {
    login,
    signUp,
    recover
}