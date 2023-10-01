import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-3 h-3 rounded-full animate-pulse dark:bg-blue-400"></div>
      <div className="w-3 h-3 rounded-full animate-pulse dark:bg-blue-400"></div>
      <div className="w-3 h-3 rounded-full animate-pulse dark:bg-blue-400"></div>
    </div>
  );
};

export default Loader;
