import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../../reducers/todoSlice';
import styles from './styles.module.scss';

const TodoForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
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
