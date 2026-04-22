import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const playlistApi = createApi({
  reducerPath: 'playlistApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5270/api/',
    // פונקציה שרצה לפני כל בקשה ומזריקה את הטוקן
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token'); // או מאיפה שאתה שומר את הטוקן
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Playlists'],
  endpoints: (builder) => ({
    // שליפת הפלייליסטים של המשתמש המחובר (לפי הטוקן)
    getPlaylists: builder.query<any, void>({
      query: () => 'Playlist/my-playlists', // הכתובת מהסווגר שלך
      providesTags: ['Playlists'],
    }),
    
    // יצירת פלייליסט חדש
    createPlaylist: builder.mutation({
      query: (newPlaylist) => ({
        url: 'Playlist',
        method: 'POST',
        body: newPlaylist,
      }),
      invalidatesTags: ['Playlists'],
    }),
    // תוסיפי את זה בתוך ה-endpoints של playlistApi
uploadSong: builder.mutation({
  query: (formData) => ({
    url: 'Song/upload-music', // ודאי שזה הנתיב המדויק מהסווגר שלך
    method: 'POST',
    body: formData,
  }),
  // זה יגרום ל-RTK Query לרענן את הפלייליסט ולהציג את השיר החדש מיד
  invalidatesTags: ['Playlists'], 
}),
  }),
});

export const { useGetPlaylistsQuery, useCreatePlaylistMutation, useUploadSongMutation } = playlistApi;