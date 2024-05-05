import React, { useState, useEffect } from "react";
import { YOUTUBE_VIDEOS_API, GOOGLE_API_KEY } from "../ultils/constants";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const selectorKeyWord = useSelector((state) => state.search.selectedTopic);
  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    getvideosfortopics();
  }, [selectorKeyWord]);

  const getVideos = async () => {
    try {
      const response = await axios.get(YOUTUBE_VIDEOS_API);
      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const getvideosfortopics = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${selectorKeyWord}&key=${GOOGLE_API_KEY}`
      );
      setVideos(response.data.items);
      console.log(videos);
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
