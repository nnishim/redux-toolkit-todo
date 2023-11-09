import React from 'react';
import styles from './styles.module.scss';
import TodoForm from './todo-form/TodoForm';
import TodoList from './todo-list/TodoList';

const Todo = () => {
  return (
    <section className={styles.todo}>
      <TodoForm />
      <TodoList />
    </section>
  );
};

export default Todo;
