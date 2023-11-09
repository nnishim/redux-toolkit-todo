import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBjVLQEqBiqSMfj_96VVlg8gSS1U2-JnOo',
  authDomain: 'to-do-392be.firebaseapp.com',
  databaseURL: 'https://to-do-392be-default-rtdb.firebaseio.com',
  projectId: 'to-do-392be',
  storageBucket: 'to-do-392be.appspot.com',
  messagingSenderId: '457197518021',
  appId: '1:457197518021:web:d2c04be39884e3046904ac',
  measurementId: 'G-H00EL5ZPSK',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { app, database };
