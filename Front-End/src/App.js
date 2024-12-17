import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CreateVideo from './components/CreateVideo';
import CreateOptions from './components/CreateOptions';
import VideoPreview from './components/VideoPreview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-options" element={<CreateOptions />} />
          <Route path="/video-preview" element={<VideoPreview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
