import React from "react";

const Searchbox = ({ title, value, handleChange }) => {
  return (
    <div className="pb-4 flex justify-end">
      <input
        autoComplete="off"
        type="text"
        className="border py-1.5 px-3 outline-none placeholder:text-sm rounded-full"
        placeholder={`Search by ${title}`}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Searchbox;
