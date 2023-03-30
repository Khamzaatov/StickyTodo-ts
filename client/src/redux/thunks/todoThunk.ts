import { createAsyncThunk } from '@reduxjs/toolkit';
import type Todo from './../../types/TodoType';

interface addMessage {
  title: string;
  text: string;
}

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todos/fetchTodos',
  async (_, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`http://localhost:4000/todo/${user.userId}`);

    if (!response.ok) {
      return rejectWithValue('Ошибка сервера!');
    }

    const data = await response.json();

    return data.todos as Todo[];
  },
);

export const addTodos = createAsyncThunk<Todo, addMessage, { rejectValue: string }>(
  'todos/addTodos',
  async ({ title, text }, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`http://localhost:4000/todo/add/${user.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        text: text,
      }),
    });

    const todo = await response.json();

    if (!response.ok) {
      return rejectWithValue(todo);
    }

    return todo[todo.length - 1] as Todo;
  },
);

export const removeTodos = createAsyncThunk<
  { id: string },
  { id: string },
  { rejectValue: string }
>('todos/removeTodos', async ({ id }, { getState, rejectWithValue }) => {
  const { user } = (await getState()) as { user: { userId: string } };
  const response = await fetch(`http://localhost:4000/todo/delete/${user.userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ todo: id }),
  });

  const data = await response.json();

  if (!response.ok) {
    return rejectWithValue(data);
  }

  console.log(data);

  return { id };
});

export const checkTodos = createAsyncThunk<{ id: string }, { id: string }, { rejectValue: string }>(
  'todos/checkTodos',
  async ({ id }, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`http://localhost:4000/todo/update/${user.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data);
    }

    return { id };
  },
);
