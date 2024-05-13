import React from "react";

const VideoCard = ({ info }) => {
  const { channelTitle, title, thumbnails } = info.snippet;
  // const { viewCount } = info.statistics;
  // const convertViewNumbers = () => {
  //   const numViews = Number(viewCount); 
  //   if (numViews > 1000000) {
  //     const millions = (numViews / 1000000).toFixed(1); 
  //     return `${millions} million`; 
  //   } else if (numViews > 1000) {
  //     const thousands = (numViews / 1000).toFixed(1); 
  //     return `${thousands}k`; 
  //   }
  //   return `${numViews}`; 
  // };
  return (
    <div className="p-2 m-2 mx-4 w-52 shadow-lg h-80 ">
      <img alt="thumbnail" className="rounded-lg" src={thumbnails.medium.url} />
      <ul className="mt-3">
        <li className="font-bold">{title}</li>
        <li className="mt-3">{channelTitle}</li>

      </ul>
    </div>
  );
};


export default VideoCard;
