import React from "react";
import { useLocation } from "react-router-dom";
import "./VideoPlayback.css";

const VideoPlayback = () => {
  const location = useLocation();
  const { videoUri } = location.state || {};
  const videoRef = React.useRef(null);

  return (
    <div className="video-playback-container">
      {videoUri ? (
        <video ref={videoRef} className="video" src={videoUri} controls />
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
};

export default VideoPlayback;