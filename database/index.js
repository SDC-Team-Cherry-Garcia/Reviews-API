const mysql = require('mysql2');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect(err => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('You are connected to the database!');
  }
});

module.exports = connection;