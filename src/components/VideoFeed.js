import React, { useEffect, useRef } from 'react';

const VideoFeed = ({ onStreamReady }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play().then(() => {
          if (onStreamReady) onStreamReady(videoRef.current);
        }).catch((err) => console.error("Video play error:", err));
      })
      .catch(err => console.error("Webcam error:", err));
  }, [onStreamReady]);

  return <video ref={videoRef} className="video" />;
};

export default VideoFeed;
