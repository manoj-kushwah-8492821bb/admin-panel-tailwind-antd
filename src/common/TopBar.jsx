import React from "react";

const TopBar = (props) => {
  const { text, title, action, icon } = props;
  return (
    <div className="mb-5 flex justify-between">
      <div>{title}</div>
      {text && (
        <button
          onClick={action}
          className="bg-color text-sm flex items-center gap-0.5 p-1.5 px-3 rounded"
        >
          <span className="text-xl text-white">{icon}</span>
          {text}
        </button>
      )}
    </div>
  );
};

export default TopBar;
