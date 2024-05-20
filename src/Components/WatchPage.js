import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { YOUTUBE_VIDEOS_API } from "../ultils/constants";
import { closeMenu } from "../ultils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { GOOGLE_API_KEY } from "../ultils/constants";
import axios from "axios";
import { Link } from "react-router-dom";
import VideoCard from "./VideoCard";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import subscribe from "../assets/subscriprion.png";
const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const videoId = searchParams.get("v");
  const [expanded, setExpanded] = useState(false);
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
    channelTitle: "",
    channelId: "",
  });
  const [channelLogo, setChannelLogo] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeMenu());
    fetchVideoDetails();
    window.scrollTo(0, 0);
  }, [videoId]);

  const fetchVideoDetails = async () => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.items.length > 0) {
        const { title, description, channelTitle, channelId } =
          data.items[0].snippet;
        setVideoDetails({ title, description, channelTitle, channelId });
        fetchChannelLogo(channelId); // Fetch the channel logo after getting channelId
      } else {
        console.error("Video details not found");
      }
    } catch (error) {
      console.error("Failed to fetch video details", error);
    }
  };

  const fetchChannelLogo = async (channelId) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.items.length > 0) {
        const channelLogo = data.items[0].snippet.thumbnails.default.url;
        setChannelLogo(channelLogo);
      } else {
        console.error("Channel logo not found");
      }
    } catch (error) {
      console.error("Failed to fetch channel logo", error);
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
          height="3.0%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="w-full">
          <h1 className="text-2xl font-bold mt-4 mb-2">{videoDetails.title}</h1>
          <div className="flex justify-between">
            <div className="flex items-center">
              {channelLogo && (
                <img
                  src={channelLogo}
                  alt="Channel Logo"
                  className="w-10 h-10 rounded-full mr-2"
                />
              )}
              <h6 className="font-bold">{videoDetails.channelTitle}</h6>
            </div>
            <div className="flex items-center justify-items-center">
              <div>
                <button className="text-white bg-red-600 p-2 pl-4 pr-4 rounded-md mr-14">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center">
                <img
                  src={like}
                  alt="Like"
                  className="h-8 mr-4 cursor-pointer"
                />
                <img
                  src={dislike}
                  alt="Dislike"
                  className="h-8 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4"></div>
          <p className="text-base text-gray-700 bg-gray-300 rounded-md p-4">
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
          <Link to={`/watch?v=${vids.id}`} key={vids.id}>
            <VideoCard info={vids} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WatchPage;
