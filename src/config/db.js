const mongoose = require('mongoose')
const { dbUrl } = require('.')

const connect = async ()=>{
    const connection = await mongoose.connect(dbUrl)
    console.log("Conectados a la BD:", connection.connection.host)
}

module.exports = connect