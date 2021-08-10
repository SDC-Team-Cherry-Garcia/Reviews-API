const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

module.exports = connection.connect(err => {
  if (err) {
    console.log('Error connecting to database', err);
  } else {
    console.log('You are connected to the database!');
  }
});
