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
        <li className="font-bold pt-5">
          <Link to="/">Home</Link>
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Shorts")}
        >
          Shorts
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("videos")}
        >
          Videos
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("live")}
        >
          Live
        </li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("music")}
        >
          Music
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("sports")}
        >
          Sports
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("gaming")}
        >
          Gaming
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("movies")}
        >
          Movies
        </li>
      </ul>
      <h1 className="font-bold pt-5">Tech Youtubers</h1>
      <ul>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick(" Akshay Saini")}
        >
          Akshay Saini
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Hitesh Chaoudary")}
        >
          Hitesh Chaoudary
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("JV Lokesh")}
        >
          JV Lokesh
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick(" KG COding")}
        >
          KG Coding
        </li>
      </ul>
      <h1 className="font-bold pt-5">Technology</h1>
      <ul>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("react js")}
        >
          React Js
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("javascript")}
        >
          JavaScript
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Java")}
        >
          Java
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Kotlin")}
        >
          Kotlin
        </li>
      </ul>
      <h1 className="font-bold pt-5">News</h1>
      <ul>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Republic Tv")}
        >
          Republic Tv
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("ABC News")}
        >
          ABC News
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("India Today")}
        >
          India Today
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Times Now")}
        >
          Times Now
        </li>
      </ul>
      <h1 className="font-bold pt-5">Music</h1>
      <ul>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Weekend")}
        >
          Weekend
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Kendrick Lamar")}
        >
          Kendrick Lamar
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Taylor Swift")}
        >
          Taylor Swift
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Alan Walker")}
        >
          Alan Walker
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
