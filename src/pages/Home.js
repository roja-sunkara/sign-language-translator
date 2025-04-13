// src/pages/Home.js
import React, { useEffect, useRef, useState } from 'react';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs';
import { auth } from '../firebase';

const Home = () => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [gesture, setGesture] = useState('');

  useEffect(() => {
    const loadModel = async () => {
      const handposeModel = await handpose.load();
      setModel(handposeModel);
    };

    loadModel();

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Webcam error: ", err);
      });
  }, []);

  useEffect(() => {
    if (model) {
      const detect = async () => {
        const predictions = await model.estimateHands(videoRef.current);
        if (predictions.length > 0) {
          const thumbTip = predictions[0].landmarks[4];
          const indexTip = predictions[0].landmarks[8];

          const isThumbsUp = thumbTip[1] < indexTip[1];
          setGesture(isThumbsUp ? '👍 Thumbs Up' : '');
        }

        requestAnimationFrame(detect);
      };

      detect();
    }
  }, [model]);

  const handleLogout = () => auth.signOut();

  return (
    <div className="App">
      <h1>Sign Language Translator</h1>
      <button onClick={handleLogout}>Logout</button>
      <video ref={videoRef} className="video" />
      <p>Detected Gesture: {gesture}</p>
    </div>
  );
};

export default Home;
