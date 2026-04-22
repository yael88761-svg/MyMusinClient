import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../features/user/userApi';
import userReducer from '../features/user/userSlice';
import { playlistApi } from '../features/playlist/playlistApi';
// 1. ייבוא של ה-songSlice
import songReducer from '../features/song/songSlice'; 

export const store = configureStore({
  reducer: {
    // ה-Reducers של הסלייסים (מצב מקומי)
    user: userReducer,
    song: songReducer, // 2. הוספת הסלייס של השיר לכאן
    
    // ה-Reducers של ה-API (תקשורת עם השרת)
    [userApi.reducerPath]: userApi.reducer,
    [playlistApi.reducerPath]: playlistApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(playlistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;