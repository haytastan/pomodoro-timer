import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var config = {
    apiKey: "AIzaSyC0eeYLTU2oAf625E7ltyTJ-crBF5e0eCg",
    authDomain: "sort-of.firebaseapp.com",
    databaseURL: "https://sort-of.firebaseio.com",
    projectId: "sort-of",
    storageBucket: "sort-of.appspot.com",
    messagingSenderId: "787024745847"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};