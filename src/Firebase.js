
import firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFkQWVGg3HVIci89wOiYx3Ih9yAzube-g",
    authDomain: "johnhancocktask.firebaseapp.com",
    databaseURL: "https://johnhancocktask.firebaseio.com",
    projectId: "johnhancocktask",
    storageBucket: "johnhancocktask.appspot.com",
    messagingSenderId: "404042028622"
};

var firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export default firebaseApp;