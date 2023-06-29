// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_API_KEY,
//     authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_APP_ID
// };
const firebaseConfig = {
    apiKey: "AIzaSyAfr15BL284wz4gLD8YO7eQoa9qU3sFNwY",
    authDomain: "fullstack-next.firebaseapp.com",
    projectId: "fullstack-next",
    storageBucket: "fullstack-next.appspot.com",
    messagingSenderId: "247776833570",
    appId: "1:247776833570:web:a89e0359f786c5410f5a7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)