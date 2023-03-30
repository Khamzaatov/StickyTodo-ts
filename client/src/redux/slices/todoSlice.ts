import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Todo from './../../types/TodoType';
import { addTodos, fetchTodos, removeTodos } from '../thunks/todoThunk';
import { checkTodos } from './../thunks/todoThunk';

type TodoState = {
  todos: Todo[];
  status: 'init' | 'loading' | 'success' | 'error';
  search: string;
  error: string | undefined;
  modalStatus: boolean;
};

const initialState: TodoState = {
  todos: [],
  status: 'init',
  search: '',
  error: '',
  modalStatus: false,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    clearSearh: (state) => {
      state.search = '';
    },
    changeModalStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'success';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      })
      .addCase(addTodos.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
      .addCase(removeTodos.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.todos = state.todos.filter((item) => item._id !== action.payload.id);
      })
      .addCase(checkTodos.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        const todo = state.todos.find((item) => item._id === action.payload.id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      });
  },
});

export default todoSlice.reducer;
export const { setSearch, clearSearh, changeModalStatus } = todoSlice.actions;
