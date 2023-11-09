import React, { useState } from 'react';
import styles from './styles.module.scss';
import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const app = initializeApp({
  apiKey: 'AIzaSyBjVLQEqBiqSMfj_96VVlg8gSS1U2-JnOo',
  authDomain: 'to-do-392be.firebaseapp.com',
  databaseURL: 'https://to-do-392be-default-rtdb.firebaseio.com',
  projectId: 'to-do-392be',
  storageBucket: 'to-do-392be.appspot.com',
  messagingSenderId: '457197518021',
  appId: '1:457197518021:web:d2c04be39884e3046904ac',
  measurementId: 'G-H00EL5ZPSK',
});

const auth = getAuth(app);

const GoogleSignInButton = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
      console.log('Вход через Google успешно выполнен.');
    } catch (error) {
      console.error('Ошибка входа через Google:', error);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      console.log('Выход выполнен.');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <button
      className={styles.button}
      onClick={isAuthenticated ? signOutWithGoogle : signInWithGoogle}
    >
      {isAuthenticated ? 'Выйти' : 'Войти'}
    </button>
  );
};

export default GoogleSignInButton;
