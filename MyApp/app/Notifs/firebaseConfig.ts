import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyAgCBUE0A960QVSpCfyhZ5YSrjJsUQ1bo4",
  authDomain: "capstone-bbc6b.firebaseapp.com",
  projectId: "capstone-bbc6b",
  storageBucket: "capstone-bbc6b.firebasestorage.app",
  messagingSenderId: "507509467398",
  appId: "1:507509467398:web:da65e90e6f309de72fd687",
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default firebase;