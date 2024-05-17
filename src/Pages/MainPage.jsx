import { Box, Typography } from "@mui/material";
import React from "react";
import AudioIcon from "../assets/AudioIcon.png";
import VideoIcon from "../assets/VideoIcon.png";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center text-center">
        <Typography variant="h1" className="text-white heading">
          Recordify
        </Typography>
      </div>
      <div className="mt-32 flex justify-center w-screen">
        <div className="p-4">
          <Box
            onClick={() => navigate("/audio")}
            className="h-96 w-96 rounded-3xl px-4 bg-[#0ea4e9da] flex flex-col justify-center align-middle items-center hover:cursor-pointer hover:transform hover:scale-105 transition-transform"
          >
            <img src={AudioIcon} width="100" alt="Audio Icon" />
            <Typography variant="h3" className="text-white">
              Audio
            </Typography>
          </Box>
        </div>
        <div className="p-4">
          <Box  onClick={() => navigate("/video")} className="h-96 w-96 rounded-3xl px-4 bg-[#0ea4e9da] flex flex-col justify-center align-middle items-center hover:cursor-pointer hover:transform hover:scale-105 transition-transform">
            <img src={VideoIcon} width="100" alt="Video Icon" />
            <Typography variant="h3" className="text-white">
              Video
            </Typography>
          </Box>
        </div>
      </div>
    </>
  );
};

export default MainPage;
