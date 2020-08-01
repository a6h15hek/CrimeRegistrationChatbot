import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "AIzaSyBkHuYE72Qq6OB8bjQrru93GNyOLFDEnsU",
    authDomain: "crimereportingportal.firebaseapp.com",
    databaseURL: "https://crimereportingportal.firebaseio.com",
    projectId: "crimereportingportal",
    storageBucket: "crimereportingportal.appspot.com",
    messagingSenderId: "498428612010",
    appId: "1:498428612010:web:d677c36852e90139f9afd3",
    measurementId: "G-PDRX41W30G"
};
firebase.initializeApp(firebaseConfig);
console.log("firebase initialize")

export default firebase;