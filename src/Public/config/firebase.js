import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDzG_qYJK-quTOSOjCtiREE7CstnkfPiEw',
  authDomain: 'macro-polymer-268903.firebaseapp.com',
  databaseURL: 'https://macro-polymer-268903.firebaseio.com',
  projectId: 'macro-polymer-268903',
  storageBucket: 'macro-polymer-268903.appspot.com',
  messagingSenderId: '437811172471',
  appId: '1:437811172471:web:c04fd8deb211d8d7a5e272',
  measurementId: 'G-45MQR671RY'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDatabase = firebaseApp.database();
const firebaseAuth = firebaseApp.auth();

const firebaseTimestamp = firebase.database.ServerValue.TIMESTAMP;

// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';

// const db = database();

export { firebase, firebaseTimestamp, firebaseDatabase, firebaseAuth };
