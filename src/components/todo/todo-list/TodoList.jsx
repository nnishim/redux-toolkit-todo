import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, toggleTodo } from '../../../reducers/todoSlice';
import styles from './styles.module.scss';

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

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
            name="completed"
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
