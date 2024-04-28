import React from "react";

const VideoCard = ({ info }) => {
  console.log(info);
  const { channelTitle, title, thumbnails } = info.snippet;
  const { viewCount } = info.statistics;
  return (
    <div className="p-2 m-2 w-80 shadow-lg">
      <img alt="thumbnail" className="rounded-lg" src={thumbnails.medium.url} />
      <ul>
        <li className="font-bold">{title}</li>
        <li>{channelTitle}</li>
        <li>{viewCount} Views</li>
      </ul>
    </div>
  );
};

export const adVideoCard = (VideoCard) => {
  return (
    <div className="p-1 m-1 border border-red-900">
      <VideoCard />
    </div>
  );
};
export default VideoCard;
