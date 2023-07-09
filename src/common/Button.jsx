import React from "react";

const Button = (props) => {
  const { text, icon } = props;
  return (
    <button className="bg-color flex items-center gap-0.5 p-1.5 rounded">
      <span className="text-xl text-white">{icon}</span>
      {text}
    </button>
  );
};

export default Button;
