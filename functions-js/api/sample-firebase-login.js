// const firebaseConfig = require("../firebaseconfig");
// import { firebaseConfig } from "../firebaseconfig";
// const firebaseConfig = require('../firebaseconfig.json');
require('dotenv').config();

// const functions = require("firebase-functions");

// const firebaseConfig = {
//   apiKey: process.env.FB_APIKEY,
//   authDomain: process.env.FB_AUTHDOMAIN,
//   projectId: process.env.FB_PROJECTID,
//   storageBucket: process.env.FB_STORAGEBUCKET,
//   messagingSenderId: process.env.FB_MESSAGINGSENDERID,
//   appId: process.env.FB_APPID,
//   measurementId: process.env.FB_MEASUREMENTID
// }

const { onRequest } = require("firebase-functions/v2/https");

const { initializeApp, getApp, getApps } = require('firebase/app');
// const app = initializeApp(firebaseConfig);
// getApps().length === 0 ? initializeApp(firebaseConfig) : getApp(); // 중복 초기화 방지
getApps().length === 0 ? initializeApp(JSON.parse(process.env.FB_CONFIG)) : getApp(); // 중복 초기화 방지

const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");






const login = onRequest((request, response) => {
  console.log(JSON.parse(process.env.FB_CONFIG));

  const { email, password } = request.query;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
      return response.status(200).json({ user: user });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      return response.status(400).json({ error: errorMessage });
    });
});



module.exports = {
  login
};
