import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// songApi.ts
export const songApi = createApi({
  reducerPath: 'songApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5270/api/'}),
  tagTypes: ['Playlists'], // חשוב להשתמש באותה מילה בדיוק כמו ב-playlistApi
  endpoints: (builder) => ({
    uploadSong: builder.mutation({
      query: (formData) => ({
        url: 'Song/upload-music',
        method: 'POST',
        body: formData,
      }),
      // התיקון הקריטי: זה יגרום ל-getPlaylists ב-LibraryPage לרוץ מחדש אוטומטית
      invalidatesTags: ['Playlists'], 
    }),
  }),
});

export const { useUploadSongMutation } = songApi;