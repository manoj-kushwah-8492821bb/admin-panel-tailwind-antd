import React, { useEffect } from "react";
import { MdExpandLess } from "react-icons/md";
import Loader from "./Loader";

const Pagination = (props) => {
  const { handlePrev, from, to, total, handleForw, fetchLoad } = props;
  const end = to >= total ? total : to;

  useEffect(() => {
    if (from >= total) {
      handlePrev();
    }
  }, [total]);

  if (fetchLoad) {
    return (
      <div className="w-full py-5">
        <Loader />
      </div>
    );
  } else {
    return total == 0 ? (
      <div className=" p-3 overflow-auto sm:py-3 py-2.5 sm:text-sm border-t border-gray-200 text-xs  w-full flex items-center gap-3 justify-center">
        No Record Found
      </div>
    ) : (
      <div className=" p-3 overflow-auto sm:py-3 py-2.5 sm:text-sm border-t border-gray-200 text-xs bg-gray-100 w-full flex items-center gap-3 justify-end">
        <div className="">
          {from + 1}
          {` - ${end}`} of {total}
        </div>
        <div className=" flex gap-1">
          {/* Previous */}
          <button
            type="button"
            onClick={handlePrev}
            className="w-6 h-6  rounded-full flex justify-center items-center cursor-pointer ">
            <MdExpandLess className="text-xl rotate-[270deg]" />
          </button>

          {/* next */}
          <button
            disabled={end === total}
            type="button"
            onClick={handleForw}
            className="w-6 h-6  rounded-full flex justify-center items-center cursor-pointer ">
            <MdExpandLess className="text-xl rotate-[90deg]" />
          </button>
        </div>
      </div>
    );
  }
};

export default Pagination;
