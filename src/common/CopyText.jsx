import React from "react";
import toast from "react-hot-toast";
import { BiSolidCopy } from "react-icons/bi";

const CopyText = ({ value }) => {
  return (
    <BiSolidCopy
      onClick={() => {
        toast.success("copied to clipboard");
        navigator.clipboard.writeText(value);
      }}
      className="text-gray-500 text-xl cursor-pointer"
    />
  );
};

export default CopyText;
