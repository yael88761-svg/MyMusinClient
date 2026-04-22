// בתוך ה-endpoints של ה-API שלכם
uploadSong: builder.mutation({
  query: (formData) => ({
    url: 'Song/upload-music',
    method: 'POST',
    body: formData, // FormData כולל את הקובץ ואת ה-PlaylistId
    // חשוב: RTK Query יודע לזהות FormData ולא לשים Content-Type ידני
  }),
  invalidatesTags: ['Playlists'], // כדי שהשיר החדש יופיע מיד בטבלה
}),