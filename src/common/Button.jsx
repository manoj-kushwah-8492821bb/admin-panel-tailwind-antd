import React from "react";

const Button = (props) => {
  const { text, icon, action } = props;
  return (
    <button
      onClick={action}
      className="bg-color text-sm uppercase flex items-center gap-0.5 p-1.5 px-3 rounded"
    >
      <span className="text-xl text-white">{icon}</span>
      {text}
    </button>
  );
};

export default Button;
