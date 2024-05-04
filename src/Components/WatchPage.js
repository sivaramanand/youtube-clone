import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../ultils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { GOOGLE_API_KEY } from "../ultils/constants"; // Ensure this is correctly imported

const WatchPage = () => {
  const [searchParams] = useSearchParams();
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
  return (
    <div className="pl-6 pt-6">
      <iframe
        width="660"
        height="415"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <div className="w-[50%]">
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
  );
};

export default WatchPage;
