import React from "react";

const VideoCardNoVIews = ({info}) => {
  const { channelTitle, title, thumbnails } = info.snippet;
  const { viewCount } = info.statistics;

  return (
    <div className="p-2 m-2 mx-4 w-52 shadow-lg h-80 ">
      <img alt="thumbnail" className="rounded-lg" src={thumbnails.medium.url} />
      <ul className="mt-3">
        <li className="font-bold">{title.slice(0, 50)}</li>
        <li className="mt-3">{channelTitle}</li>
      </ul>
    </div>
  );
};

export default VideoCardNoVIews;
