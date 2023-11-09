import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, setTodos } from '../../../reducers/todoSlice';
import styles from './styles.module.scss';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { database } from '../../../firebase/firebase';

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const todosRef = ref(getDatabase(database), 'todos');

    const handleDataChange = (snapshot) => {
      const todosData = snapshot.val();
      if (todosData) {
        const todosArray = Object.keys(todosData).map((key) => ({
          id: key,
          ...todosData[key],
        }));
        dispatch(setTodos(todosArray));
      } else {
        dispatch(setTodos([]));
      }
    };

    const dataChangeListener = onValue(todosRef, handleDataChange);

    return () => {
      off(todosRef, dataChangeListener);
    };
  }, [dispatch]);

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <li className={styles.list_item} key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <span
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            {todo.text}
          </span>
          <button
            className={styles.list_btn}
            onClick={() => handleRemoveTodo(todo.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
