import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AudioRecorder from "./Pages/AudioRecorder";
import MainPage from "./Pages/MainPage";
import VideoRecorder from "./Pages/VideoRecorder";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/audio" element={<AudioRecorder />} />
          <Route path="/video" element={<VideoRecorder />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
