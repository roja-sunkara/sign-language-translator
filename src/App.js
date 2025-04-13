import React, { useState, useEffect } from 'react';
import './App.css';
import { auth } from './firebase'; // Import firebase auth
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Authentication handler for login or signup
  const handleAuth = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else if (type === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user state when logged in
    });
    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div className="App">
      <h1>Sign Language Translator</h1>

      {user ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <h2>Welcome, {user.email}</h2>
        </div>
      ) : (
        <div className="auth-form">
          <h2>Login / Sign Up</h2>
          <form>
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
              <button onClick={(e) => handleAuth(e, 'login')}>Login</button>
              <button onClick={(e) => handleAuth(e, 'signup')}>Sign Up</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;



