import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const handleStartNow = () => {
    navigate('/create-options');
  };

  return (
    <div className="homepage">
      <div className="intro-section">
        <div className="desc-section">
          <h1>Welcome to RANG REZ</h1>
          <h2>The GenAI Video Maker</h2>
          <p>Create stunning videos for your special occasions effortlessly!</p>
          <button className="crazy-button" onClick={handleStartNow}>Start Now</button>
        </div>
        <div className="logo-section">
          <img src={`${process.env.PUBLIC_URL}/images/App Logo.png`} alt="App Logo" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
