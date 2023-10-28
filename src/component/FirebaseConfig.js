
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC-AcgNNLpF1gGzoQ-u_xQanmzjQx8IlfM",
  authDomain: "fir-auth-47983.firebaseapp.com",
  projectId: "fir-auth-47983",
  storageBucket: "fir-auth-47983.appspot.com",
  messagingSenderId: "189832054654",
  appId: "1:189832054654:web:3d7eb05f5d8e3e9f9b152f",
  measurementId: "G-JYJY282GJT"
};
const app = initializeApp(firebaseConfig);



export const database=getAuth(app);