import { configureStore } from '@reduxjs/toolkit';

import appReducer     from './slices/appSlice';
import authReducer    from './slices/authSlice';
import catalogReducer from './slices/catalogSlice';
import userReducer    from './slices/userSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    catalog: catalogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
