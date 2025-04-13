import React from 'react';

const GestureOutput = ({ detectedGesture, history }) => {
  return (
    <div className="output">
      <h2>Detected Gesture</h2>
      <p className="current-gesture">{detectedGesture || "None"}</p>

      {history.length > 0 && (
        <>
          <h3>Gesture History</h3>
          <ul>
            {history.slice(0).reverse().map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default GestureOutput;
