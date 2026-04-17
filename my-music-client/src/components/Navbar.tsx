import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'; // בהנחה שאת משתמשת ב-React Router
import { RootState } from '../app/store'; // הנתיב לסטור שלך
import { logout } from '../features/user/userSlice'; // הפעולה ליציאה מהמערכת
import './Navbar.css'; // נוסיף קצת עיצוב למטה

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  
  // שליפת המשתמש מה-Store כדי לדעת אם הוא מחובר
  const { currentUser } = useSelector((state: RootState) => state.user);

  return (
    <nav className="smart-player-nav">
      <div className="nav-logo">
        <Link typeof='link' to="/">🎵 SmartPlayer</Link>
      </div>

      <div className="nav-links">
        <Link typeof='link' to="/library">ספריה</Link>
        <Link typeof='link' to="/trending">פופולארי</Link>
      </div>

      <div className="nav-auth">
        {currentUser ? (
          <div className="user-profile">
            <span>שלום, <strong>{currentUser.userName}</strong></span>
            <button onClick={() => dispatch(logout())} className="logout-btn">התנתק</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link typeof='link'  to="/login" className="login-link">התחברות</Link>
            <Link typeof='link'  to="/signup" className="signup-btn">הרשמה</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;