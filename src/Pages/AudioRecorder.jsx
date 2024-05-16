import React, { useState } from 'react';
import RecordRTC from 'recordrtc';
import axios from 'axios';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioRecorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/mp3',
      recorderType: RecordRTC.StereoAudioRecorder,
      desiredSampRate: 16000,
    });
    audioRecorder.startRecording();
    setRecorder(audioRecorder);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    recorder.stopRecording(async () => {
      const blob = recorder.getBlob();
      const formData = new FormData();
      formData.append('audio', blob, 'recording.mp3');

      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsRecording(false);
      recorder.reset();
      recorder.destroy();
      setRecorder(null);
    });
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
};

export default AudioRecorder;
