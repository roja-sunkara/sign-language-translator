import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import { auth } from './firebaseConfig';
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

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await handpose.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };
    startVideo();
  }, []);

  useEffect(() => {
    const detectGesture = async () => {
      if (model && videoRef.current) {
        const predictions = await model.estimateHands(videoRef.current);
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

          const isVictory =
            indexTip[1] < middleTip[1] &&
            ringTip[1] > middleTip[1] &&
            pinkyTip[1] > middleTip[1];

          const isFist =
            indexTip[1] > landmarks[6][1] &&
            middleTip[1] > landmarks[10][1] &&
            ringTip[1] > landmarks[14][1] &&
            pinkyTip[1] > landmarks[18][1];

          const isOpenHand =
            indexTip[1] < landmarks[6][1] &&
            middleTip[1] < landmarks[10][1] &&
            ringTip[1] < landmarks[14][1] &&
            pinkyTip[1] < landmarks[18][1];

          if (isThumbUp) setDetectedGesture('👍 Thumbs Up');
          else if (isVictory) setDetectedGesture('✌️ Victory');
          else if (isFist) setDetectedGesture('👊 Fist');
          else if (isOpenHand) setDetectedGesture('🖐️ Open Hand');
          else setDetectedGesture('');
        } else {
          setDetectedGesture('');
        }
      }
      requestAnimationFrame(detectGesture);
    };

    if (model) detectGesture();
  }, [model]);

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
      console.error(`${type} error:`, error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <h1>Sign Language Translator</h1>

      {user ? (
        <>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <video
            ref={videoRef}
            className="video"
            autoPlay
            playsInline
            style={{ width: '640px', height: '480px', borderRadius: '10px' }}
          />
          <p className="gesture">{detectedGesture}</p>
        </>
      ) : (
        <div className="auth-form">
          <h2>Login / Sign Up</h2>
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




