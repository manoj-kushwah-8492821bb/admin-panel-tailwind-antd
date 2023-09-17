import React, { useState } from "react";

const DateRange = ({ handleFilter }) => {
  const [formInput, setFormInput] = useState({});

  // handleChange
  const handleChange = (event) => {
    setFormInput({ [event.target.name]: event.target.value });
  };

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
          onClick={() => handleFilter(formInput)}
          className="text-blue-500"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default DateRange;
