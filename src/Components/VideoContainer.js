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
  const [videoStats, setVideoStats] = useState([]);
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

        const videoIds = videoItems.map((item) => item.id.videoId).join(",");
        console.log(videoIds, "videoIds");
        const statsURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${GOOGLE_API_KEY}`;
        console.log(statsURL);
        const statsResponse = await fetch(statsURL);
        console.log(statsResponse);
        const statsData = await statsResponse.json();
        console.log(statsData);

        const videosWithStats = videoItems.map((item) => {
          const stats = statsData.items.find(
            (statItem) => statItem.id === item.id.videoId
          );
          return {
            ...item,
            statistics: stats ? stats.statistics : {},
          };
        });

        setVideos(videosWithStats);
        dispatch(updateSearchResults(videosWithStats));

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
