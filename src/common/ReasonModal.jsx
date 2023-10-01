import React, { useState } from "react";
import ShowError from "./ShowError";

const ReasonModal = (props) => {
  const { title, handleCancel, isOpen, handleConfirm } = props;
  const [reason, setReason] = useState("");
  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 items-center flex justify-center left-0 w-full h-screen bg-modal">
        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="mt-2 ">
              <p className="mt-1 text-sm text-gray-500 ">
                Please provide reason to reject {title}.
              </p>
              <textarea
                type="text"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                className="flex  w-full  py-2 mt-2 outline-none gap-2 border-gray-700 border rounded-md px-4 items-center"
              />
              {reason.length === 0 && (
                <ShowError data="The reason field is required." />
              )}
            </div>
          </div>

          <div className="flex mt-5 sm:flex-row flex-col sm:items-center gap-3 ">
            <button
              onClick={handleCancel}
              type="button"
              className=" bg-gray-200 w-full justify-center text-sm flex items-center gap-1 cursor-pointer tracking-wider p-2 sm:px-4 rounded text-gray-800">
              Cancel
            </button>

            <button
              onClick={() =>
                handleConfirm({
                  ...isOpen,
                  [title === "KYC" ? "reason" : "message"]: reason,
                })
              }
              type="button"
              disabled={reason.length === 0}
              className="bg-color  w-full justify-center text-sm flex items-center gap-1 tracking-wider p-2 sm:px-4 rounded text-white">
              Reject
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ReasonModal;
