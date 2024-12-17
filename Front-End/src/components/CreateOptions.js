import React, { useState, useEffect, useRef } from 'react';

import './CreateOptions.css';


function CreateOptions() {
  const [step, setStep] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [userName, setUserName] = useState('');
  const [specialNote, setSpecialNote] = useState('');
  const fileInputRef = useRef(null);

  const videos = [
    `${process.env.PUBLIC_URL}/Videos/Video1.mp4`,
    `${process.env.PUBLIC_URL}/Videos/Video2.mp4`,
    `${process.env.PUBLIC_URL}/Videos/Video3.mp4`,
    `${process.env.PUBLIC_URL}/Videos/Video4.mp4`,
    `${process.env.PUBLIC_URL}/Videos/Video5.mp4`,
    `${process.env.PUBLIC_URL}/Videos/Video6.mp4`
  ];

  const handleStartNowClick = () => {
    setStep(1); // Move to the video selection step
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setStep(2); // Move to the user details step after selecting a video
  };

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleCrazyUploadClick = () => {
    fileInputRef.current.click();
  };

  const videoCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="create-options">
      <div className="info-area">
        {step === 0 && (
          <div className="options">
            <h2>Welcome to Rang Rez!</h2>
            <button className="start-now-btn" onClick={handleStartNowClick}>Start Now</button>
          </div>
        )}
        {step === 1 && (
          <div className="videos">
            <h3>Select Video Template:</h3>
            <Slider {...videoCarouselSettings}>
              {videos.map((video, index) => (
                <div key={index} className="video-item">
                  <video width="320" height="240" controls>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button className="video-select-btn" onClick={() => handleVideoClick(video)}>Select</button>
                </div>
              ))}
            </Slider>
          </div>
        )}
        {step === 2 && (
          <div className="user-details">
            <h3>Enter Name:</h3>
            <input
              type="text"
              value={userName}
              onChange={handleInputChange(setUserName)}
              placeholder="Enter the name of the birthday person"
            />
            <h3>Enter Special Note:</h3>
            <input
              type="text"
              value={specialNote}
              onChange={handleInputChange(setSpecialNote)}
              placeholder="Enter a special note"
            />
            <div className="upload-images">
              <h3>Upload Images:</h3>
              <button className="crazy-upload-btn" onClick={handleCrazyUploadClick}>
                <span className="upload-icon">📤</span>
                <span>Upload Photo</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
            <button className="next-btn">Process Video</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateOptions;
