import React from 'react';
import { useLocation } from 'react-router-dom';

function VideoPreview() {
  const location = useLocation();
  const { videoUrl } = location.state || {}; // Get videoUrl from location state

  return (
    <div className="video-preview">
      {videoUrl ? (
        <video controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>No video URL available</p>
      )}
    </div>
  );
}

export default VideoPreview;
