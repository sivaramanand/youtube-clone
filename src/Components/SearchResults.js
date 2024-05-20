import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { GOOGLE_API_KEY } from "../ultils/constants";
import { updateSearchResults } from "../ultils/searchSlice";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [videos, setVideos] = useState([]);
  const query = searchParams.get("q");
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();

  const convertViewNumbers = (viewCount) => {
    if (viewCount > 1000000) {
      const millions = (viewCount / 1000000).toFixed(1);
      return `${millions} million`;
    } else if (viewCount > 1000) {
      const thousands = (viewCount / 1000).toFixed(1);
      return `${thousands}k`;
    }
    return `${viewCount}`;
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query) => {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${query}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(searchURL);
      const data = await response.json();
      const videoItems = data.items;

      const videoIds = videoItems.map((item) => item.id.videoId).join(",");
      console.log(videoIds,"videoIds")
      const statsURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${GOOGLE_API_KEY}`;
      console.log(statsURL)
      const statsResponse = await fetch(statsURL);
      console.log(statsResponse)
      const statsData = await statsResponse.json();
      console.log(statsData)


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
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  return (
    <div>
      {videos.map((item, index) => (
        <Link
          to={`/watch?v=${item.id.videoId}`}
          key={index}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="p-4 flex bg-white hover:bg-gray-100 rounded-lg cursor-pointer">
            <img
              src={item.snippet.thumbnails.high.url}
              alt={item.snippet.title}
              className="w-36 h-68"
            />
            <div className="ml-5 flex flex-col ">
              <h2 className="text-lg font-bold">{item.snippet.title}</h2>
              <h3 className="mt-2">{item.snippet.channelTitle}</h3>
              <h3>
                {item.statistics?.viewCount
                  ? `${convertViewNumbers(item.statistics.viewCount)} views`
                  : "No view count available"}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
