const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS, 
    database: "Employee"
});

con.connect(function(err) {
    if (err) {
        console.log("connection error", err);
    } else {
        console.log("Connected to the MySQL server");
    }
});

module.exports = con;
