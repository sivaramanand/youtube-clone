import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API } from "../ultils/constants";
import { Link } from "react-router-dom";
import VideoCard, { adVideoCard } from "./VideoCard";
import axios from "axios";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(YOUTUBE_VIDEOS_API);
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      {videos[0] && <adVideoCard info={videos[0]} />}
      {videos.map((vids) => (
        <Link to={"/watch?v=" + vids.id}>
          <VideoCard key={vids.id} info={vids} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
