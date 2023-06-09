"use client";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import dotenv from "dotenv";

dotenv.config();

const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
});

export const auth = app.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default app;
