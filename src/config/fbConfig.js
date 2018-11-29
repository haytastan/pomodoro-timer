import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyC0eeYLTU2oAf625E7ltyTJ-crBF5e0eCg",
    authDomain: "sort-of.firebaseapp.com",
    databaseURL: "https://sort-of.firebaseio.com",
    projectId: "sort-of",
    storageBucket: "sort-of.appspot.com",
    messagingSenderId: "787024745847"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase