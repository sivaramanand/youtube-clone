import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedTopic } from "../ultils/searchSlice";
const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const dispatch = useDispatch();
  if (!isMenuOpen) return null;
  const handleTopicClick = (topic) => {
    dispatch(setSelectedTopic(topic));
  };

  return (
    <div className="p-5 mx-4 shadow-lg w-48">
      <ul>
        <li
          className="font-bold pt-5 cursor-pointer"
          onClick={() => handleTopicClick("home")}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Shorts")}
        >
          Shorts
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("videos")}
        >
          Videos
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("live")}
        >
          Live
        </li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("music")}
        >
          Music
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("sports")}
        >
          Sports
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("gaming")}
        >
          Gaming
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("movies")}
        >
          Movies
        </li>
      </ul>
      <h1 className="font-bold pt-5">Tech Youtubers</h1>
      <ul>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick(" Akshay Saini")}
        >
          Akshay Saini
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Hitesh Chaoudary")}
        >
          Hitesh Chaoudary
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("JV Lokesh Coding")}
        >
          JV Lokesh Coding
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick(" KG Coding")}
        >
          KG Coding
        </li>
      </ul>
      <h1 className="font-bold pt-5">Technology</h1>
      <ul>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("react js")}
        >
          React Js
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("javascript")}
        >
          JavaScript
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Java")}
        >
          Java
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Kotlin")}
        >
          Kotlin
        </li>
      </ul>
      <h1 className="font-bold pt-5">News</h1>
      <ul>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Republic Tv")}
        >
          Republic Tv
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("ABC News")}
        >
          ABC News
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("India Today")}
        >
          India Today
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Times Now")}
        >
          Times Now
        </li>
      </ul>
      <h1 className="font-bold pt-5">Music</h1>
      <ul>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Weekend")}
        >
          Weekend
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Kendrick Lamar")}
        >
          Kendrick Lamar
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Taylor Swift")}
        >
          Taylor Swift
        </li>
        <li
          className="text-lg cursor-pointer mt-3"
          onClick={() => handleTopicClick("Alan Walker")}
        >
          Alan Walker
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
