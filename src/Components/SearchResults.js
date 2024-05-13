import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GOOGLE_API_KEY } from "../ultils/constants";
import { updateSearchResults } from "../ultils/searchSlice";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!searchResults.length && query) {
      fetchSearchResults(query);
    }
  }, [query]);

  const fetchSearchResults = async (query) => {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=30&q=${query}&key=${GOOGLE_API_KEY}`;
    try {
      const response = await fetch(searchURL);
      const data = await response.json();
      console.log(data, "data for search results");
      dispatch(updateSearchResults(data.items));
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  return (
    <div>
      {searchResults.map((item, index) => (
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
              <h3 className="mt-4">{item.snippet.channelTitle}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
