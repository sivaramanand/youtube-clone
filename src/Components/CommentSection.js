import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../ultils/constants";
import moment from "moment";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import "./CommentSection.css";
const CommentSection = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    fetchOtherData();
    window.scrollTo(0, 0);
  }, [videoId]); 

  const fetchOtherData = async () => {
    const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${GOOGLE_API_KEY}&videoId=${videoId}`;
    const response = await fetch(videoComment_url);
    const data = await response.json();
    setCommentData(data.items);
  };

  return (
    <div>
      {" "}
      <h2 className="font-bold mt-8 mb-8 font-10 ">Comments</h2>
      {commentData.map((item, index) => (
        <div key={index} className="comment">
          <img
            src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt=""
          />
          <div>
            <h3>
              {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
              <span>
                {moment(
                  item.snippet.topLevelComment.snippet.publishedAt
                ).fromNow()}
              </span>
            </h3>
            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="comment-action">
              <img src={like} alt="like" />
              <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
              <img src={dislike} alt="dislike" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
