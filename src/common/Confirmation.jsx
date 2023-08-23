import React from "react";
import ButtonLoader from "./ButtonLoader";

const Confrimation = (props) => {
  const { title, handleCancel, isOpen, handleConfirm, loading } = props;
  return (
    isOpen && (
      <div className="tracking-wider overflow-hidden absolute z-50 top-0 items-center flex justify-center left-0 w-full h-screen bg-modal">
        <div className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9 text-color "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
            </div>

            <div className="mt-2 text-center">
              <h3
                className=" font-medium leading-6 text-color capitalize "
                id="modal-title">
                Delete {title}
              </h3>
              <p className="mt-1 text-sm text-gray-500 ">
                Are you sure? {title} will be remove.
              </p>
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
              onClick={handleConfirm}
              type="button"
              disabled={loading}
              className="bg-color  w-full justify-center text-sm flex items-center gap-1 cursor-pointer tracking-wider p-2 sm:px-4 rounded text-white">
              {loading ? <ButtonLoader /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Confrimation;
