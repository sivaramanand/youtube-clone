import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleMenu } from "../ultils/appSlice";
import { updateSearchResults } from "../ultils/searchSlice";
import { GOOGLE_API_KEY } from "../ultils/constants";
import { useNavigate } from "react-router-dom";
import { setSelectedTopic } from "../ultils/searchSlice";
import { YOUTUBE_VIDEOS_API } from "../ultils/constants";
import axios from "axios";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [SearchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(() => getSearchSuggestions(), 1600);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  const fetchVideos = async () => {
    try {
      const response = await axios.get(YOUTUBE_VIDEOS_API);
      const updatedVideos = response.data.items.map(video => ({
        ...video,
        videoId: video.id  
      }));
      console.log(updatedVideos)
      setVideos(updatedVideos);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };
  const getSearchSuggestions = async () => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchQuery}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data.items) && data.items.length > 0) {
        const subtitles = data.items.map((item) => item.snippet.title);
        setTitles(subtitles);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        console.error("No search suggestions found.");
      }
    } catch (error) {
      setShowSuggestions(false);
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleTitleClick = (title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
    searchvideos(title)
  };
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const searchvideos = async () => {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=15&q=${searchQuery}&key=${GOOGLE_API_KEY}`;
    try {
      setShowSuggestions(false);
      const searchresponse = await fetch(searchURL);
      const searchdata = await searchresponse.json();
      setSearchResults(searchdata);
      dispatch(updateSearchResults(searchdata.items));
      navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    } catch (error) {
      setShowSuggestions(false);
      console.error("Error fetching search suggestions:", error);
    }
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 text-center">
        <img
          onClick={toggleMenuHandler}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://static.vecteezy.com/system/resources/previews/021/190/402/non_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
        ></img>
        <img
          className="h-8 cursor-pointer"
          alt="youtube-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          onClick={() => navigate("/")}
        ></img>
      </div>

      <div className="col-span-10 text-sm relative">
        <input
          placeholder="search"
          type="text"
          className="w-1/2 h-10 border border-gray-400 p-2 rounded-l-full"
          style={{ verticalAlign: "middle" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />

        <button
          className="border h-10 border-gray-400 p-2 rounded-r-full "
          style={{ verticalAlign: "middle" }}
          onClick={searchvideos}
        >
          <FaSearch />
        </button>
        {titles.length > 0 && searchQuery.length > 0 && showSuggestions && (
          <div
            className="absolute bg-white px-2 py-5 w-1/2 z-10"
            onClick={() => setShowSuggestions(false)}
          >
            <ul>
              {titles.map((videotitles, index) => (
                <li
                  key={index}
                  className="flex justify-between cursor-pointer mb-3"
                  onClick={() => handleTitleClick(videotitles)}
                >
                  {videotitles}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-1 text-center">
        <button>
          <img
            className="h-8"
            alt="user-logo"
            src="https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default Head;
