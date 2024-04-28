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
      <Button names={list} />
    </div>
  );
};

export default ButtonList;
