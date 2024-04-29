// Database connection
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'finalproject'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});