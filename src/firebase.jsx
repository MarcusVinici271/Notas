import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCEcjOyFql_C0hoF-vLCUQZlmi62st8VZA',
  authDomain: 'notasreact-e640f.firebaseapp.com',
  projectId: 'notasreact-e640f',
  storageBucket: 'notasreact-e640f.appspot.com',
  messagingSenderId: '458682913089',
  appId: '1:458682913089:web:xxxxxxxxxxxxxxxxxxxxx',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, GoogleAuthProvider, signInWithPopup, signOut, collection, addDoc, getDocs, doc, deleteDoc };
