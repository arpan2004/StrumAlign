import React from 'react';
import './Record.css';

const Record = () => {
  return (
    <div className="hand-tracking-container">
      <h1 className="title">Real-Time Hand Tracking</h1>
      <div className="video-container">
        <img
          src="http://localhost:5000/video_feed"
          alt="Hand Tracking"
          className="video-feed"
        />
      </div>
    </div>
  );
};

export default Record;
