import React from "react";

const Button = ({ names }) => {
  return (
    <div>
      {names.map((topics) => (
        <button key={topics} className="px-5 px-2 m-5 bg-gray-100 rounded-md">
          {topics}
        </button>
      ))}
    </div>
  );
};

export default Button;
