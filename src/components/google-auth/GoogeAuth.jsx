import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  getRedirectResult,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const GoogleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const provider = new firebase.auth.GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setLoading(false);
        console.log(user);
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        console.log('Пользователь вышел из системы.');
      }
    });

    getRedirectResult(auth)
      .then((result) => {
        if (result.user) {
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider).catch((error) => {
      setError(error.message);
    });
  };

  const signOutWithGoogle = () => {
    signOut(auth).catch((error) => {
      setError(error.message);
    });
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <button
        className={styles.button}
        onClick={isAuthenticated ? signOutWithGoogle : signInWithGoogle}
      >
        {isAuthenticated ? 'Выйти' : 'Войти'}
      </button>
    </div>
  );
};

export default GoogleAuth;
