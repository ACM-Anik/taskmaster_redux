import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import usersSlice from './features/users/usersSlice';

const store = configureStore({
  reducer: {
    tasksSlice: tasksSlice,
    usersSlice: usersSlice,
  },
});

export default store;