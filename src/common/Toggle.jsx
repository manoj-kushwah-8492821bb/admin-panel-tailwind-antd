import React, { memo } from "react";

const Toggle = (props) => {
  const { _id, value, handleChange } = props;
  return (
    <label
      htmlFor={_id}
      className="inline-flex items-center  space-x-4 cursor-pointer ">
      <span className="relative ">
        <input
          autoComplete="off"
          id={_id}
          type="checkbox"
          checked={value}
          onChange={handleChange}
          className="hidden peer"
        />
        <div className="w-9 h-5 rounded-full shadow-inner bg-gray-100 peer-checked:bg-blue-500"></div>
        <div className="absolute inset-y-0 left-0 w-3 h-3 m-1 icon-bg rounded-full shadow peer-checked:right-0 peer-checked:left-auto "></div>
      </span>
    </label>
  );
};

export default memo(Toggle);
