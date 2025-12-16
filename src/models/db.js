const mysql= require('mysql2')
require('dotenv').config()
const connection= await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    port:process.env.DB_PORT,
    database: process.env.DB_NAME,
})

connection.connect(err=>{
    if(err){
         console.error('Database connection failed');
        return;
    }
     console.log('Connected to MySQL');
})

module.exports = connection;