import * as firebaseAdmin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// get this JSON from the Firebase board
// you can also store the values in environment variables
import serviceAccount from "./secret.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
      clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    }),
    databaseURL: "https://nexara-development.firebaseio.com",
  });
}

export { firebaseAdmin };
