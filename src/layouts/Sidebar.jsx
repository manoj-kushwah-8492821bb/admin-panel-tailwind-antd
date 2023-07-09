import React from "react";
import { MdClose } from "react-icons/md";

const Sidebar = (props) => {
  const { handleToggle } = props;
  return (
    <div>
      <MdClose
        onClick={handleToggle}
        className="text-color text-xl md:hidden cursor-pointer"
      />
    </div>
  );
};

export default Sidebar;
