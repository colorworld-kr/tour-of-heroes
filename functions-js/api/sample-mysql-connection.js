const { onRequest } = require("firebase-functions/v2/https");
require('dotenv').config();
const mysql = require("mysql");

// The Firebase Admin SDK to access Firestore.

// var functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);

const mysqlConnectTest = onRequest((request, response) => {

  // var mysql = require('mysql');
  // console.log(process.env.DB_HOST);
  var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT

  });


  connection.connect(function (err) {
    if (err) {
      console.log("not connected");
      console.log(err);
    }

    else {
      connection.query('SELECT * from test', function (err, rows, fields) {
        console.log(rows);
        response.send(rows);
      });
      connection.end();
    }

  });

});


module.exports = {
  mysqlConnectTest
};
