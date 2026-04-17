import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/user/userApi'; // ודאי שהנתיב לתיקייה נכון
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    // 1. ה-Reducer של הסלייס (מצב המשתמש)
    user: userReducer,
    
    // 2. ה-Reducer של ה-API (ניהול הקריאות לשרת)
    [userApi.reducerPath]: userApi.reducer,
  },
  
  // 3. הוספת ה-Middleware של ה-API - חובה כדי ש-RTK Query יעבוד
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// הגדרות סוגים עבור TypeScript (מומלץ מאוד)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;