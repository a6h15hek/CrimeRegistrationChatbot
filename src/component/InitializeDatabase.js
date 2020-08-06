import firebase from 'firebase/app';
const firebaseConfig = {
    apiKey: "***************************************",
    authDomain: "***************************************",
    databaseURL: "***************************************",
    projectId: "***************************************",
    storageBucket: "***************************************",
    messagingSenderId: "***************************************",
    appId: "***************************************",
    measurementId: "***************************************"
};
firebase.initializeApp(firebaseConfig);
console.log("firebase initialize")

export default firebase;