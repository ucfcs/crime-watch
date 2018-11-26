import * as firebase from 'firebase';

const config = {
	apiKey: "AIzaSyCcLd7cD6VCRp9h-dmSlXxpFZlcIRN4BAw",
    authDomain: "crime-watch-18b0e.firebaseapp.com",
    databaseURL: "https://crime-watch-18b0e.firebaseio.com",
    projectId: "crime-watch-18b0e",
    storageBucket: "crime-watch-18b0e.appspot.com",
    messagingSenderId: "340660938605",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export{
	db,
	auth,
};