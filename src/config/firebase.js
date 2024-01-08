import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBhHB41dFDMCuhXmPGyLXgP308GIEj2sWc",
    authDomain: "ysana-d79f4.firebaseapp.com",
    databaseURL: "https://ysana-d79f4-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ysana-d79f4",
    storageBucket: "ysana-d79f4.appspot.com",
    messagingSenderId: "17843617305",
    appId: "1:17843617305:web:a815c8f95c4b8303117488",
    measurementId: "G-NLLJG77X0K"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()