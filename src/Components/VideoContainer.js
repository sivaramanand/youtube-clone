import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API, GOOGLE_API_KEY } from "../ultils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const selectedKeyword = useSelector((state) => state.search.selectedTopic);
  const isSidebarOpen = useSelector((state) => state.app.isMenuOpen);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(YOUTUBE_VIDEOS_API);
        const updatedVideos = response.data.items.map((video) => ({
          ...video,
          videoId: video.id,
        }));
        console.log(updatedVideos);
        setVideos(updatedVideos);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const fetchVideosForTopics = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${encodeURIComponent(
            selectedKeyword
          )}&key=${GOOGLE_API_KEY}`
        );
        const updatedVideos = response.data.items.map((video) => ({
          ...video,
          videoId: video.id.videoId,
        }));

        setVideos(updatedVideos);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (
      selectedKeyword == "" ||
      selectedKeyword == undefined ||
      selectedKeyword == "home"
    ) {
      fetchVideos();
    } else {
      fetchVideosForTopics();
    }
  }, [selectedKeyword]);

  return (
    <div className={`flex flex-wrap ${isSidebarOpen ? "" : "w-full"}`}>
      {videos.map((video) => (
        <Link key={video.videoId} to={`/watch?v=${video.videoId}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
