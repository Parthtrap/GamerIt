import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB7vPAQcxIABW1SKij4JIC_zMx1llZmb9s",
  authDomain: "test-1d748.firebaseapp.com",
  databaseURL: "https://test-1d748-default-rtdb.firebaseio.com",
  projectId: "test-1d748",
  storageBucket: "test-1d748.appspot.com",
  messagingSenderId: "13848499502",
  appId: "1:13848499502:web:248a65ee5b20f3557a56bf",
  measurementId: "G-GGGCWJZ5HT",
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);