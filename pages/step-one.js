import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';

export default function StepOne() {
  const [videoRecord, setVideoRecord] = useState();

  return (
    <>
      <h2>this is step two, record a video</h2>
      <div style={{ height: '80vh' }}>
        <VideoRecorder
          constraints={{
            audio: true,
            video: true,
          }}
          isFlipped={false}
          showReplayControls
          onRecordingComplete={(videoBlob) => {
            // Do something with the video...
            setVideoRecord(videoBlob);
            console.log('videoBlob', videoRecord);
          }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <span>The file size is: {videoRecord ? (videoRecord.size / (1024 * 1024)).toFixed(2) + 'Mb' : 'Not available'}</span>
      </div>
    </>
  );
}
