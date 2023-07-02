// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { onRequest } = require("firebase-functions/v2/https"); //v2

require('dotenv').config();


// The Firebase Admin SDK to access Firestore.
const { initializeApp, getApps, getApp } = require("firebase-admin/app");

// admin.initializeApp();
getApps().length === 0 ? initializeApp() : getApp(); // 중복 초기화 방지

const admin = require("firebase-admin");
const firestore = admin.firestore();


const app = express();
app.use(cors({ origin: true }));

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_EXPIRATION = "24h";

// 회원가입 API
app.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  // app.get("/signup", async (req, res) => {
  //   const { email, password, firstName, lastName } = req.query;

  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const userId = userRecord.uid;

    await firestore.collection("users").doc(userId).set({
      firstName,
      lastName,
      email,
    });

    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    return res.status(201).json({ accessToken: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// 로그인 API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // app.get("/login", async (req, res) => {
  //   const { email, password } = req.query;

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const userId = userRecord.uid;

    const userSnapshot = await firestore.collection("users").doc(userId).get();
    const userData = userSnapshot.data();

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // 패스워드 검증은 Firebase의 사용자 관리 기능을 사용하는 것이 좋습니다.
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
    return res.status(200).json({ accessToken: token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// JWT 토큰 검증 미들웨어 함수
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized: Invalid token");
      return;
    }
    req.userId = decoded.userId;
    next();
  });
};

// 인증이 필요한 API 엔드포인트 예시입니다.
app.get("/protected", authenticate, (req, res) => {
  // 여기서 req.userId는 토큰에서 해독된 사용자 ID입니다.
  // 작업을 수행합니다.
  res.send(`Hello, user ${req.userId}! This is a protected endpoint.`);
});

const api = onRequest(app);


module.exports = {
  api
};
