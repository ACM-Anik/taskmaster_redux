import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/tasksSlice';
import usersSlice from './features/users/usersSlice';
import baseApi from './features/api/baseApi';

const store = configureStore({
  reducer: {
    [baseApi.reducer]: baseApi.reducerPath,
    tasksSlice: tasksSlice,
    usersSlice: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;