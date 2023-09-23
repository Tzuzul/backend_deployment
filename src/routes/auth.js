const { Router } = require('express')
const { login, signUp, recover } = require('../controllers/auth')
const {auth: authMidleware} = require('../middlewares/auth')

const auth = (app)=>{
    const router = Router()
    app.use('/api/auth', router)
    router.post('/login', login) //endpoint
    router.post('/signup', signUp)
    router.get('/recover', authMidleware, recover)
}

module.exports = auth