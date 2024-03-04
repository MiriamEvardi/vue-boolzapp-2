import { createApp } from 'vue'
import './style.css'
import App from './App.vue'


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBx_Q-8LdHIA28gxJSpILiijog_NuViKP4",
    authDomain: "vue-boolzapp-60d22.firebaseapp.com",
    databaseURL: "https://vue-boolzapp-60d22-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vue-boolzapp-60d22",
    storageBucket: "vue-boolzapp-60d22.appspot.com",
    messagingSenderId: "475697847351",
    appId: "1:475697847351:web:12212743fb8f9afbf133b2",
    measurementId: "G-14F0G6CDJH"
};


export const fbApp = initializeApp(firebaseConfig);
export const db = getFirestore(fbApp);
export const auth = getAuth(fbApp);


createApp(App).mount('#app')