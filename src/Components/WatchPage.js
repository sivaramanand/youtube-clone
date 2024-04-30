import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../ultils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentSection from "./CommentSection";
const WatchPage = () => {
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("v"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  return (
    <div className="pl-6 pt-6">
      <iframe
        width="660"
        height="415"
        src={"https://www.youtube.com/embed/" + searchParams.get("v")}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <CommentSection />
    </div>
  );
};

export default WatchPage;
