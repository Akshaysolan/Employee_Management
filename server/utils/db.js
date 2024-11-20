const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Akshay",
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
