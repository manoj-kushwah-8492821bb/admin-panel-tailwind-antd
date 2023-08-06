import React, { useState } from "react";
import Layout from "../../../layouts";
import Form from "./Form";

const PrimePoint = () => {
  const [active, setActive] = useState("credit");
  const handleActive = (value) => setActive(value);
  return (
    <div>
      {/* Top */}
      <section className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={() => handleActive("credit")}
            className={` ${
              active === "credit" ? "bg-color" : "bg-white text-color"
            } text-sm  border border-blue-500 text-color flex items-center gap-0.5 p-1.5 px-3 rounded`}
          >
            Credit
          </button>
          <button
            onClick={() => handleActive("debit")}
            className={` ${
              active === "debit" ? "bg-color" : "bg-white  text-color"
            } text-sm  border border-blue-500 text-color flex items-center gap-0.5 p-1.5 px-3 rounded`}
          >
            Debit
          </button>
        </div>
        <span>Total Prime Points : 100000</span>
      </section>

      <Form active={active} />
    </div>
  );
};

export default Layout(PrimePoint);
