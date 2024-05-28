import React, { useState, useRef } from "react";
import RecordRTC from "recordrtc";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import { Stop } from "@mui/icons-material";

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    }); // Request only audio
    const audioRecorder = new RecordRTC(stream, {
      type: "audio",
      mimeType: "audio/mp3", // Set to MP3 format
    });
    audioRecorder.startRecording();
    setRecorder(audioRecorder);
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
      formData.append("audio", blob, "recording.mp3"); // Set the filename and extension

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/upload/audio`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsRecording(false);
      setTimer(0);
      recorder.reset();
      recorder.destroy();
      setRecorder(null);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <Typography variant="h4" className="text-white">
        AUDIO RECORDING
      </Typography>
      <Button
        variant="contained"
        className="mt-4"
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? <Stop style={{ color: "red" }} /> : "Start Recording"}
      </Button>
      {isRecording && (
        <Typography variant="body1" className="mt-4 text-white">
          Recording Time: {timer} seconds
        </Typography>
      )}
    </div>
  );
};

export default AudioRecorder;
