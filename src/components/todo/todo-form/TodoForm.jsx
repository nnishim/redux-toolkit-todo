import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../reducers/todoSlice';
import styles from './styles.module.scss';
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
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

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  const provider = new firebase.auth.GoogleAuthProvider();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        console.log(user);
      } else {
        setIsAuthenticated(false);
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
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Пожалуйста, войдите с помощью Google, чтобы добавить задачу.');
      return;
    }

    e.preventDefault();
    if (text.trim() !== '') {
      dispatch(
        addTodo({
          id: Date.now(),
          text,
          completed: false,
        })
      );
      setText('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        name="todo"
        className={styles.form_input}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите задачу..."
      />
      <button className={styles.form_btn} type="submit">
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
