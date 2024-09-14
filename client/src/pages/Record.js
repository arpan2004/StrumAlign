import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Record.css";

const Record = () => {
  const [recording, setRecording] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const navigate = useNavigate();

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setRecording(true);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        setVideoUri(URL.createObjectURL(blob));
      };

      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
    setRecording(false);

    const recordedBlob = new Blob([stream], { type: "video/mp4" });
    setVideoUri(URL.createObjectURL(recordedBlob));
    console.log(videoUri);
  };

  const handleUpload = () => {
    // Handle video upload here
  };

  const handlePlay = () => {
    if (videoUri) {
      navigate("/video-playback", { state: { videoUri } });
    }
  };

  return (
    <div className="record-container">
      <video ref={videoRef} className="video" autoPlay />
      <div className="controls">
        <button className="button" onClick={startRecording}>
          Record
        </button>
        <button
          className="button"
          onClick={stopRecording}
          style={{ backgroundColor: "red" }}
        >
          Stop
        </button>
        <button className="button" onClick={handleUpload}>
          Upload
        </button>
        {videoUri && (
          <button className="button" onClick={handlePlay}>
            Play
          </button>
        )}
      </div>
      {videoUri && <video src={videoUri} controls />}
    </div>
  );
};

export default Record;
