// src/LoginSignup.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Firebase config

const LoginSignup = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);  // Toggle between login and signup

  // Handle Login/Signup actions
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login User
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign Up User
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleAuth}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
      </p>
    </div>
  );
};

export default LoginSignup;
