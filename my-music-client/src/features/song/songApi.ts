import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// songApi.ts
export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5270/api/',
    prepareHeaders: (headers) => {
      // שליפת הטוקן מהאחסון המקומי
      const token = localStorage.getItem('token');
      
      // אם קיים טוקן, הזרקתו ל-Header תחת Authorization
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Playlists'], // שומרים על אותה תגית לסנכרון עם playlistApi
  endpoints: (builder) => ({
    uploadSong: builder.mutation({
      query: (formData) => ({
        url: 'Song/upload-music',
        method: 'POST',
        body: formData,
        // הערה: כששולחים FormData, הדפדפן מגדיר את ה-Content-Type אוטומטית, אין להגדיר ידנית.
      }),
      // גורם לריענון אוטומטי של רשימת הפלייליסטים לאחר העלאה מוצלחת
      invalidatesTags: ['Playlists'], 
    }),
  }),
});

export const { useUploadSongMutation } = songApi;