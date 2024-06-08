import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API, GOOGLE_API_KEY } from "../ultils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { updateSearchResults } from "../ultils/searchSlice";

const VideoContainer = () => {
  const dispatch = useDispatch();
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
      const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${selectedKeyword}&key=${GOOGLE_API_KEY}`;
      try {
        const response = await fetch(searchURL);
        const data = await response.json();
        const videoItems = data.items;
        console.log(videoItems);

        const videosWithStats = await Promise.all(
          videoItems.map(async (item) => {
            const statsURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${item.id.videoId}&key=${GOOGLE_API_KEY}`;
            const statsResponse = await fetch(statsURL);
            const statsData = await statsResponse.json();
            const stats = statsData.items[0]?.statistics || {};
            return {
              ...item,
              videoId: item.id.videoId,
              statistics: stats,
            };
          })
        );
        console.log(videosWithStats);
        setVideos(videosWithStats);
        dispatch(updateSearchResults(videosWithStats));
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (!selectedKeyword || selectedKeyword === "home") {
      fetchVideos();
    } else {
      fetchVideosForTopics();
    }
  }, [selectedKeyword, dispatch]);

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
