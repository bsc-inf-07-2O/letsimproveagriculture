const mysql = require ('mysql')
const dotenv = require ('dotenv')

dotenv.config()

const config = {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASAWORD,
    connectionLimit: 100,
}

    const connection = mysql.createConnection(config)

    module.exports = connection