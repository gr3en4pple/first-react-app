// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyApFOeloNaUoTjxltF6qssY9HaMSaW438w',
  authDomain: 'todo-list-aa2b6.firebaseapp.com',
  projectId: 'todo-list-aa2b6',
  storageBucket: 'todo-list-aa2b6.appspot.com',
  messagingSenderId: '202421366856',
  appId: '1:202421366856:web:fbf71dbedd6b091e1ba87d',
  measurementId: 'G-8WL1G0T3CH',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
