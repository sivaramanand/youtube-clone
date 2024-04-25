import React from "react";
import { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../ultils/constants";
import axios from "axios";
const VideoContainer = () => {
  const [videos, setVideos] = useState();
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {

  };
  return <div>VideoContainer</div>;
};

export default VideoContainer;
