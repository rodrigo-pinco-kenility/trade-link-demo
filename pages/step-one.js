import React from 'react';
import VideoRecorder from 'react-video-recorder';

export default function StepOne() {
  let videoRecord;

  return (
    <>
      <h2>this is step two, record a video</h2>

      <VideoRecorder
        constraints={{
          audio: true,
          video: true,
        }}
        isFlipped={false}
        showReplayControls
        onRecordingComplete={(videoBlob) => {
          // Do something with the video...
          videoRecord = videoBlob;
          console.log('videoBlob', videoBlob);
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <button>Retry</button>
        <button style={{ marginLeft: '20px' }}>Next</button>
      </div>
    </>
  );
}
