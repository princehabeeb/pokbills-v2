import { configureStore } from '@reduxjs/toolkit';
import authReducer from './globalState';

const store = configureStore({
  reducer: {
    globalState: authReducer,
  },
});

export default store;
