import React, { useState } from 'react';
import { useSignupMutation } from './userApi';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signup, { isLoading }] = useSignupMutation();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      alert(password);
      await signup({ name, email, password }).unwrap();
      alert('החשבון נוצר בהצלחה!');
    } catch (err) {
      alert('שגיאה ביצירת החשבון');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input placeholder="שם משתמש" onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="אימייל" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="סיסמה" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isLoading}>הרשמה</button>
    </form>
  );
};

export default Signup;