import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyCWTL3ub2JqBz5XUoxYCGLoxlSM6LcHtm0",
  authDomain: "storeage-quickstart.firebaseapp.com",
  databaseURL: "https://storeage-quickstart.firebaseio.com",
  projectId: "storeage-quickstart",
  storageBucket: "storeage-quickstart.appspot.com",
  messagingSenderId: "42838829847"
};
var fire = firebase.initializeApp(config);
export default fire;
