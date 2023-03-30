import { configureStore } from "@reduxjs/toolkit";
import todo from './../slices/todoSlice';
import user from './../slices/userSlice';

export const store = configureStore({
    reducer: {
        user,
        todo
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch