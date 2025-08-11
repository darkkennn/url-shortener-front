import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, 
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, 
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,  
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,           
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const firebaseInitialConfig = typeof window.__firebase_config !== 'undefined' ? JSON.parse(window.__firebase_config) : null;
const currentAppId = typeof window.__app_id !== 'undefined' ? window.__app_id : 'default-app-id';


const app = initializeApp(firebaseInitialConfig || firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, currentAppId };