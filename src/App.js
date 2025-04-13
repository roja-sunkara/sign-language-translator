import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import { auth } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

function App() {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [detectedGesture, setDetectedGesture] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  // Load handpose model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await handpose.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Start webcam stream
  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Webcam error:', error);
      }
    };
    startVideo();
  }, []);

  // Detect gestures
  useEffect(() => {
    const detectGesture = async () => {
      if (model && videoRef.current) {
        const video = videoRef.current;
        const predictions = await model.estimateHands(video);

        if (predictions.length > 0) {
          const landmarks = predictions[0].landmarks;
          const thumbTip = landmarks[4];
          const indexTip = landmarks[8];
          const middleTip = landmarks[12];
          const ringTip = landmarks[16];
          const pinkyTip = landmarks[20];

          const isThumbUp =
            thumbTip[1] < indexTip[1] &&
            thumbTip[1] < middleTip[1] &&
            thumbTip[1] < ringTip[1] &&
            thumbTip[1] < pinkyTip[1];

          setDetectedGesture(isThumbUp ? '👍 Thumbs Up' : '');
        } else {
          setDetectedGesture('');
        }
      }
      requestAnimationFrame(detectGesture);
    };

    if (model) {
      detectGesture();
    }
  }, [model]);

  // Handle login/signup
  const handleAuth = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return (
    <div className="App">
      <h1>Sign Language Translator</h1>
      {user ? (
        <>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
          <video ref={videoRef} className="video" autoPlay muted></video>
          <p className="gesture">{detectedGesture}</p>
        </>
      ) : (
        <div className="auth-form">
          <h2>Login / Signup</h2>
          <form>
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



