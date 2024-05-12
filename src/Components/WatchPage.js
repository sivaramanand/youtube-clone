import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { YOUTUBE_VIDEOS_API } from "../ultils/constants";
import { closeMenu } from "../ultils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { GOOGLE_API_KEY } from "../ultils/constants"; // Ensure this is correctly imported
import axios from "axios";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const videoId = searchParams.get("v");
  const [expanded, setExpanded] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoDetails();
    getVideos();
    window.scrollTo(0, 0);
  }, [videoId]);

  const fetchVideoDetails = async () => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.items.length > 0) {
        const { title, description } = data.items[0].snippet;
        setVideoDetails({ title, description });
      } else {
        console.error("Video details not found");
      }
    } catch (error) {
      console.error("Failed to fetch video details", error);
    }
  };
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
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
    <div className="flex w-full">
      <div className="pl-6 pt-6 flex-grow" style={{ width: "70%" }}>
        <iframe
          width="100%"
          height="2.5%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="w-full">
          <h1 className="text-2xl font-bold mt-4 mb-2">{videoDetails.title}</h1>
          <p className="text-base text-gray-700">
            {videoDetails.description.length > 150 && !expanded
              ? `${videoDetails.description.substring(0, 147)}... `
              : videoDetails.description}
            {videoDetails.description.length > 150 && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleExpanded}
              >
                {expanded ? "See Less" : "See More"}
              </span>
            )}
          </p>
          <CommentSection />
        </div>
      </div>
      <div
        className="flex flex-col justify-center align-middle"
        style={{ width: "30%" }}
      >
        {videos.map((vids) => (
          <Link to={"/watch?v=" + vids.id}>
            <VideoCard key={vids.id} info={vids} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
