import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Record from "./pages/Record";
import VideoPlayback from "./pages/VideoPlayback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/record" element={<Record />} />
        <Route path="/video-playback" element={<VideoPlayback />} />
      </Routes>
    </Router>
  );
}

export default App;