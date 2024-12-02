import firebase from 'firebase/app';
import 'firebase/messaging';
import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {

};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default firebase;
