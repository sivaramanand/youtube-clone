import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../ultils/appSlice";
import { GOOGLE_API_KEY } from "../ultils/constants";
const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => getSearchSugesstions(), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSugesstions = async () => {
    console.log(searchQuery);
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${searchQuery}&key=${GOOGLE_API_KEY}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data.items) && data.items.length > 0) {
        const titles = data.items.map((item) => item.snippet.title);
        console.log(titles);
      } else {
        console.error("No search suggestions found.");
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-1 text-center">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://static.vecteezy.com/system/resources/previews/021/190/402/non_2x/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
        ></img>
        <img
          className="h-8"
          alt="youtube-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
        ></img>
      </div>

      <div className="col-span-10 text-sm">
        <input
          placeholder="search"
          type="text"
          className="w-1/2 h-10 border border-gray-400 p-2 rounded-l-full"
          style={{ verticalAlign: "middle" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="border h-10 border-gray-400 p-2 rounded-r-full "
          style={{ verticalAlign: "middle" }}
        >
          <FaSearch />
        </button>
      </div>
      <div className="col-span-1 text-center">
        <img
          className="h-8"
          alt="user-logo"
          src="https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75"
        ></img>
      </div>
    </div>
  );
};

export default Head;
