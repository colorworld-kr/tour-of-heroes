/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { helloWorld, addmessage, makeuppercase } = require('./api/sample-simple');
const { mysqlConnectTest } = require('./api/sample-mysql-connection');
const { api } = require('./api/sample-firebase-auth');
const { login } = require('./api/sample-firebase-login');

exports.helloWorld = helloWorld;
exports.mysql = mysqlConnectTest;
exports.api = api;
exports.login = login;

