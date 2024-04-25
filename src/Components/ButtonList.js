import React from "react";
import Button from "./Button";
const ButtonList = () => {
  const list = [
    "All",
    "Gaming",
    "Songs",
    "Live",
    "Soccer",
    "Cricket",
    "Cooking",
    "Valentines",
  ];
  return (
    <div className="flex">
      {list.map((topics) => (
        <button key={topics} className="flex px-5 px-2 m-5 bg-gray-100 rounded-md">{topics}</button>
      ))}
    </div>
  );
};

export default ButtonList;
