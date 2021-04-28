const mysql = require("mysql");
exports.db = mysql.createConnection({
    host: "localhost",
    user: 'immo',
    password: 'immo1111',
    database: 'employee'
})