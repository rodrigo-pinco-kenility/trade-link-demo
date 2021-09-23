import { Button } from '@mui/material';
import React, { useState } from 'react';
import Timer from 'react-compound-timer/build';
import Webcam from 'react-webcam';

import styles from './step-one.module.css';

export default function StepOne() {
  const videoConstraints = {
    width: 1280,
    height: 720,
  };

  const timer = React.useRef(null);

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const handleStartCaptureClick = React.useCallback(() => {
    timer.current.start();
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    timer.current.stop();
  }, [mediaRecorderRef, setCapturing]);

  const calculateTotalSize = () => {
    let size = 0;
    recordedChunks.forEach((chunk) => {
      size += chunk.size;
    });

    size = (size / (1024 * 1024)).toFixed(2);
    return size + 'Mb';
  };

  return (
    <>
      <h2>this is step two, record a video</h2>
      <div className={styles.controls}>
        <Webcam audio={true} ref={webcamRef} />
        {capturing ? (
          <Button className={styles.record_button} variant="contained" onClick={handleStopCaptureClick}>
            Stop Capture
          </Button>
        ) : (
          <Button className={styles.record_button} variant="contained" onClick={handleStartCaptureClick}>
            Start Capture
          </Button>
        )}
        <Timer ref={timer} startImmediately={false}>
          {({ start, pause, stop, reset }) => (
            <React.Fragment>
              <div>
                <Timer.Minutes />:
                <Timer.Seconds />
              </div>
            </React.Fragment>
          )}
        </Timer>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          <span>The file size is: {recordedChunks ? calculateTotalSize() : 'Not available'}</span>
        </div>
      </div>
    </>
  );
}
