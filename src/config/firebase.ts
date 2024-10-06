import { initializeApp, credential } from "firebase-admin";
import fs from "fs";

export const firebaseCredential = credential.cert(
	JSON.parse(fs.readFileSync("../../.env.json", "utf-8")),
);

export const firebase = initializeApp({
	credential: firebaseCredential,
});
