const { Router } = require('express')
const { login, signUp } = require('../controllers/auth')

const auth = (app)=>{
    const router = Router()
    app.use('/api/auth', router)
    router.post('/login', login) //endpoint
    router.post('/signup', signUp)
}

module.exports = auth