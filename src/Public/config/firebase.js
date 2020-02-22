import firebase from 'firebase';

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
const db = firebaseApp.database();

export { db };
