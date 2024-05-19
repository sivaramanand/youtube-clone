import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSelectedTopic } from "../ultils/searchSlice";
import { SiYoutubeshorts } from "react-icons/si";
import { MdLocalMovies } from "react-icons/md";
import { BiSolidVideos } from "react-icons/bi";
import { RiLiveFill } from "react-icons/ri";
import { FaMusic } from "react-icons/fa";
import { MdSportsCricket } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { IoHome } from "react-icons/io5";

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
          <div className="flex items-center gap-1">
            <IoHome />
            <h6 className="flex items-center">
              <Link to="/">Home</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer"
          onClick={() => handleTopicClick("Shorts")}
        >
          <div className="flex items-center gap-1">
            <SiYoutubeshorts />
            <h6 className="flex items-center">
              <Link to="/">Shorts</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("videos")}
        >
          <div className="flex items-center gap-1">
            <BiSolidVideos />
            <h6 className="flex items-center">
              <Link to="/">Videos</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("live")}
        >
          <div className="flex items-center gap-1">
            <RiLiveFill />
            <h6 className="flex items-center">
              <Link to="/">Live</Link>
            </h6>
          </div>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Subscriptions</h1>
      <ul>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("music")}
        >
          <div className="flex items-center gap-1">
            <FaMusic />
            <h6 className="flex items-center">
              <Link to="/">Music</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("sports")}
        >
          <div className="flex items-center gap-1">
            <MdSportsCricket />
            <h6 className="flex items-center">
              <Link to="/">Sports</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("gaming")}
        >
          <div className="flex items-center gap-1">
            <SiYoutubegaming />
            <h6 className="flex items-center">
              <Link to="/">Gaming</Link>
            </h6>
          </div>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("movies")}
        >
          <div className="flex items-center gap-1">
            <MdLocalMovies />
            <h6 className="flex items-center">
              <Link to="/">Movies</Link>
            </h6>
          </div>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Tech Youtubers</h1>
      <ul>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick(" Akshay Saini")}
        >
          <Link to="/">Akshay Saini</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Hitesh Chaoudary")}
        >
          <Link to="/"> Hitesh Chaoudary</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("JV Lokesh Coding")}
        >
          <Link to="/"> JV Lokesh Coding</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick(" KG Coding")}
        >
          <Link to="/"> KG Coding</Link>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Technology</h1>
      <ul>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("react js")}
        >
          <Link to="/"> React Js</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("javascript")}
        >
          <Link to="/"> JavaScript</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Java")}
        >
          <Link to="/"> Java</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Kotlin")}
        >
          <Link to="/"> Kotlin</Link>
        </li>
      </ul>
      <h1 className="font-bold pt-5">News</h1>
      <ul>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Republic Tv")}
        >
          <Link to="/"> Republic Tv</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("ABC News")}
        >
          <Link to="/"> ABC News</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("India Today")}
        >
          <Link to="/"> India Today</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Times Now")}
        >
          <Link to="/"> Times Now</Link>
        </li>
      </ul>
      <h1 className="font-bold pt-5">Music</h1>
      <ul>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Weekend")}
        >
          <Link to="/"> Weekend</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Kendrick Lamar")}
        >
          <Link to="/"> Kendrick Lamar</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Taylor Swift")}
        >
          <Link to="/"> Taylor Swift</Link>
        </li>
        <li
          className="text-lg cursor-pointer "
          onClick={() => handleTopicClick("Alan Walker")}
        >
          <Link to="/"> Alan Walker</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
