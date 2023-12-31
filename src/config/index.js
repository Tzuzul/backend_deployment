require('dotenv').config()

const config = {
    port: process.env.PORT,
    jwtKey: process.env.JWT_KEY,
    dbUrl: process.env.DB_URL,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalClientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mailgunApiKey:process.env.MAILGUN_PRIVATE_API_KEY,
}

module.exports = config