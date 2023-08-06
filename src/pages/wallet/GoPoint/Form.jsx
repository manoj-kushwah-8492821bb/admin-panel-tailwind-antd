import React from "react";

const Form = (props) => {
  const { active } = props;
  return (
    <div className="bg-white my-3 shadow-md p-4 rounded">
      <form className="text-sm w-1/2 grid gap-3">
        {/* username */}
        <div className="grid gap-1">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
          />
        </div>

        {/* amount */}
        <div className="grid gap-1">
          <label htmlFor="amount" className="capitalize">
            {active} Amount
          </label>
          <input
            type="text"
            id="amount"
            className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
          />
        </div>

        {/* remarks */}
        <div className="grid gap-1">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            rows={6}
            type="text"
            id="remarks"
            className="block w-full px-3 py-1.5 bg-transparent outline-none border rounded-md"
          />
        </div>

        {/* buttons */}
        <div className="grid grid-cols-3 mt-1 gap-5">
          <button
            type="submit"
            className="w-full px-5 py-2 text-sm font-medium tracking-wide text-white capitalize  bg-color duration-300 flex items-center justify-center transform  rounded-md bg-button focus:outline-none "
          >
            {active}
          </button>
          <button
            type="submit"
            className="w-full px-5 py-2 text-sm font-medium tracking-wide text-color border border-color capitalize  bg-white duration-300 flex items-center justify-center transform  rounded-md bg-button focus:outline-none "
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
