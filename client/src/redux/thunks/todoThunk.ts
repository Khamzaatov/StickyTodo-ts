import { createAsyncThunk } from '@reduxjs/toolkit';
import type Todo from './../../types/TodoType';

interface changeItem {
  id?: string;
  title: string
  text: string
}

export const fetchTodos = createAsyncThunk<Todo[], void, { rejectValue: string }>(
  'todos/fetchTodos',
  async (_, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`https://stickytodos.onrender.com/todo/${user.userId}`);

    if (!response.ok) {
      return rejectWithValue('Ошибка сервера!');
    }

    const data = await response.json();

    return data.todos as Todo[];
  },
);

export const addTodos = createAsyncThunk<Todo, changeItem, { rejectValue: string }>(
  'todos/addTodos',
  async ({ title, text }, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`https://stickytodos.onrender.com/todo/add/${user.userId}`, {
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
  const response = await fetch(`https://stickytodos.onrender.com/todo/delete/${user.userId}`, {
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

  return { id };
});

export const checkTodos = createAsyncThunk<{ id: string }, { id: string }, { rejectValue: string }>(
  'todos/checkTodos',
  async ({ id }, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`https://stickytodos.onrender.com/todo/update/${user.userId}`, {
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

export const editTodos = createAsyncThunk<changeItem, changeItem, { rejectValue: string }>(
  'todos/editTodos',
  async ({ id, title, text }, { getState, rejectWithValue }) => {
    const { user } = (await getState()) as { user: { userId: string } };
    const response = await fetch(`https://stickytodos.onrender.com/todo/edit/${user.userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        title: title,
        text: text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data);
    }

    return { id, title, text } as changeItem;
  },
);
