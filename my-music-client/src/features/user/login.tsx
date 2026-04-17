import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from './userApi';
import { loginSuccess } from './userSlice';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(loginSuccess({ user: response, token: response.token }));
      alert('מצוין! נכנסת למערכת');
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={isLoading}>כניסה</button>
      {error && <p>טעות בפרטים, נסו שוב</p>}
    </form>
  );
};

export default Login;