// src/AuthForm.js
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="btn-group">
        <button onClick={handleAuth}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create Account' : 'Switch to Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
