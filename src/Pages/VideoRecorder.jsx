import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import { Stop } from '@mui/icons-material';

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    const videoRecorder = new RecordRTC(stream, {
      type: 'video',
      mimeType: 'video/webm', // Change to preferred video format
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });
    videoRecorder.startRecording();
    setRecorder(videoRecorder);
    setIsRecording(true);

    // Start timer
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopRecording = async () => {
    recorder.stopRecording(async () => {
      clearInterval(timerRef.current);
      const blob = recorder.getBlob();
      const formData = new FormData();
      formData.append('video', blob, 'recording.webm');

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/upload/video`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsRecording(false);
      setTimer(0);
      recorder.reset();
      recorder.destroy();
      setRecorder(null);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Typography variant="h4" className="text-white">AUDIO RECORDING</Typography>
      <Button variant="contained" className='mt-4' onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? <Stop style={{ color: 'red' }} /> : 'Start Recording'}
      </Button>
      {isRecording && <Typography variant="body1" className="mt-4 text-white">Recording Time: {timer} seconds</Typography>}
    </div>
  );
};

export default VideoRecorder;
