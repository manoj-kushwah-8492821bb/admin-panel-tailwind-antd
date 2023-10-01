import React from "react";

const DateRange = ({ handleChange, handleReset, formInput }) => {
  return (
    <div className="flex text-sm items-center pb-4 justify-end">
      <div className="py-1 border-b flex flex-wrap gap-2">
        <label htmlFor="from">From :</label>
        <input
          type="datetime-local"
          id="from"
          name="from"
          value={formInput.from}
          onChange={handleChange}
          className="outline-none "
        />

        <label htmlFor="to">To : </label>
        <input
          type="datetime-local"
          id="to"
          name="to"
          min={formInput.from}
          value={formInput.to}
          onChange={handleChange}
          className="outline-none"
        />
        <button
          onClick={handleReset}
          className="text-red-500 uppercase font-semibold"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DateRange;
