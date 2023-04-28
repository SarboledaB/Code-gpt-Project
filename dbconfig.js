const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'GPTpassword',
    database: 'GPTdatabase'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = connection;