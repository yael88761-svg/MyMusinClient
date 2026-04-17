import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '././components/Navbar'; // ודאי שהנתיב נכון
import Login from './features/user/login';
import Signup from './features/user/signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* ה-Navbar מופיע תמיד בראש כל הדפים */}
        <Navbar />

        <main className="content">
          <Routes>
            {/* דף הבית - כרגע פשוט טקסט, בהמשך יהיה כאן רשימת שירים */}
            <Route path="/" element={<h1>ברוכים הבאים לנגן החכם 🎵</h1>} />

            {/* נתיבי המשתמש */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* דף ברירת מחדל - אם המשתמש הגיע לכתובת לא קיימת */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;