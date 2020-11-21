import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDMFRFVJwLZRMMzYkAxKbfrAtcEBD1bXZo",
    authDomain: "av2grupou.firebaseapp.com",
    databaseURL: "https://av2grupou.firebaseio.com",
    projectId: "av2grupou",
    storageBucket: "av2grupou.appspot.com",
    messagingSenderId: "475561804670",
    appId: "1:475561804670:web:c75f3d23ab419fba24a92f"
};

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);