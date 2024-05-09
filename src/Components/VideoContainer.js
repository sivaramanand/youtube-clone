import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API, GOOGLE_API_KEY } from "../ultils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const selectedKeyword = useSelector((state) => state.search.selectedTopic);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(YOUTUBE_VIDEOS_API);
        setVideos(response.data.items);
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
        setVideos(response.data.items);
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (selectedKeyword === "") {
      fetchVideos();
    } else {
      fetchVideosForTopics();
    }
  }, [selectedKeyword]);

  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link key={video.id.videoId} to={`/watch?v=${video.id.videoId}`}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
