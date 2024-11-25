import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/AuthSlice';
import taskReducer from './Slices/TaskSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});