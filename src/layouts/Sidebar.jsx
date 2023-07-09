import React from "react";
import { MdClose } from "react-icons/md";

const Sidebar = (props) => {
  const { handleToggle } = props;
  return (
    <div>
      {/* Top Logo & Close */}
      <section className="flex md:p-3 p-2 items-center md:justify-center justify-between">
        <div className="">Logo</div>
        <MdClose
          onClick={handleToggle}
          className="text-color text-xl md:hidden cursor-pointer"
        />
      </section>
    </div>
  );
};

export default Sidebar;
