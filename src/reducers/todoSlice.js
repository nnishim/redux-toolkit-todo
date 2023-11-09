import { createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, set, remove, update } from 'firebase/database';
import { database } from '../firebase/firebase';

const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      };
      // Сохранение данных в Firebase
      set(ref(database, `todos/${newTodo.id}`), newTodo);
    },
    removeTodo: (state, action) => {
      const id = action.payload;
      // Удаление данных из Firebase
      remove(ref(database, `todos/${id}`));
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        // Обновление данных в Firebase
        update(ref(database, `todos/${id}`), { completed: todo.completed });
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, setTodos } = todoSlice.actions;

export default todoSlice.reducer;
