import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPlaylistsQuery, useCreatePlaylistMutation } from '../features/playlist/playlistApi';

// התיקון כאן: מייבאים את העלאת השיר מה-API הנכון
import { useUploadSongMutation } from '../features/song/songApi'; 

import { setCurrentSong } from '../features/song/songSlice';
import type { RootState } from '../app/store';

// ספריות עיצוב... (ללא שינוי)// ספריות עיצוב
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { Plus, Music, Upload, Play, Library } from 'lucide-react';

import './LibraryPage.css';

const LibraryPage = () => {
    const dispatch = useDispatch();
    
    // 1. שימוש ב-Redux במקום ב-useState מקומי עבור השיר
    const currentSong = useSelector((state: RootState) => state.song.currentSong);
    
    const { data: playlists, isLoading, error } = useGetPlaylistsQuery(); 
    const [createPlaylist] = useCreatePlaylistMutation();
    const [uploadSong] = useUploadSongMutation();

    const [selectedPlaylist, setSelectedPlaylist] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddPlaylist = async () => {
        const name = prompt("איך לקרוא לפלייליסט החדש?");
        if (!name) return;
        try {
            await createPlaylist({ playlistName: name, isSmartPlaylist: false }).unwrap();
            alert("הפלייליסט נוצר בהצלחה!");
        } catch (err) {
            alert("שגיאה ביצירת הפלייליסט");
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedPlaylist) return;

        const formData = new FormData();
        formData.append('file', file);
       // formData.append('PlaylistId', selectedPlaylist.playlistId.toString());
       // formData.append('Title', file.name.split('.')[0]);

        try {
            await uploadSong(formData).unwrap();
            alert("השיר הועלה בהצלחה!");
            if (event.target) event.target.value = ''; 
        } catch (err) {
            alert("שגיאה בהעלאת השיר");
        }
    };

    if (isLoading) return <div className="loading">טוען ספרייה...</div>;
    if (error) return <div className="error">חלה שגיאה. וודא שאתה מחובר.</div>;

    return (
        <div className="library-layout">
            <aside className="sidebar">
                <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Library size={20} color="#1DB954" />
                        <Typography variant="h6">הספרייה שלך</Typography>
                    </div>
                    <button onClick={handleAddPlaylist} className="add-playlist-btn">
                        <Plus size={20} />
                    </button>
                </div>
                <ul className="playlist-list">
                    {playlists?.map((pl: any) => (
                        <li 
                            key={pl.playlistId} 
                            onClick={() => setSelectedPlaylist(pl)}
                            className={selectedPlaylist?.playlistId === pl.playlistId ? 'active' : ''}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', cursor: 'pointer' }}
                        >
                            <Music size={16} />
                            {pl.playlistName}
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="main-content">
                {selectedPlaylist ? (
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <Typography variant="h4">{selectedPlaylist.playlistName}</Typography>
                            
                            <div>
                                <input 
                                    type="file" 
                                    accept="audio/*" 
                                    style={{ display: 'none' }} 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                />
                                <Button 
                                    variant="contained" 
                                    startIcon={<Upload />}
                                    onClick={() => fileInputRef.current?.click()}
                                    sx={{ backgroundColor: '#1DB954', '&:hover': { backgroundColor: '#1ed760' }, borderRadius: '20px' }}
                                >
                                    הוסף שיר
                                </Button>
                            </div>
                        </div>

                        {/* טבלת MUI משודרגת */}
                        <TableContainer component={Paper} sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: '#b3b3b3' }}>#</TableCell>
                                        <TableCell sx={{ color: '#b3b3b3' }}>כותרת</TableCell>
                                        <TableCell sx={{ color: '#b3b3b3' }}>אמן</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {selectedPlaylist.playlistSongs?.map((ps: any, index: number) => (
                                        <TableRow 
                                            key={ps.song.songId} 
                                            hover
                                            // 2. עדכון השיר ב-Redux בלחיצה
                                            onClick={() => dispatch(setCurrentSong(ps.song))}
                                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' } }}
                                        >
                                            <TableCell sx={{ color: 'white', border: 'none' }}>{index + 1}</TableCell>
                                            <TableCell sx={{ color: 'white', border: 'none' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Play size={14} fill="#1DB954" color="#1DB954" />
                                                    {ps.song.title}
                                                </div>
                                            </TableCell>
                                            <TableCell sx={{ color: '#b3b3b3', border: 'none' }}>{ps.song.artist || "אמן לא ידוע"}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <div className="empty-state">בחר פלייליסט כדי להתחיל להאזין</div>
                )}
            </main>

            {/* נגן בתחתית המסך */}
            {currentSong && (
                <footer className="player-bar">
                    <div className="song-info">
                        <strong>{currentSong.title}</strong>
                        <span>{currentSong.artist}</span>
                    </div>
                    <audio controls autoPlay key={currentSong.songId}>
                        <source src={`http://localhost:5270/${currentSong.filePath}`} type="audio/mpeg" />
                    </audio>
                </footer>
            )}
        </div>
    );
};

export default LibraryPage;