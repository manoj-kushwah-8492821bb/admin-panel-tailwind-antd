import React, { useState } from "react";
import { BsChatDots, BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";

import Logo from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [pop, setPop] = useState(false);
  const { handleToggle, drawer } = props;

  return (
    <div className="p-4 bg-white sticky z-40 border-b top-0 left-0 shadow-sm flex items-center">
      <HiOutlineMenu
        onClick={handleToggle}
        className="text-color text-xl cursor-pointer"
      />
      <div
        className={`sm:ml-5 ml-2.5 ${
          drawer ? "hidden md:flex" : "flex md:hidden"
        }`}>
        <img src={Logo} alt="navbar-logo" className=" w-32 sm:w-36" />
      </div>

      {/* Left Portion */}
      <section className="flex ml-auto gap-3 sm:gap-4 md:gap-5">
        <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <HiOutlineSearch />
        </div>
        <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <MdOutlineNotificationsActive />
        </div>
        <div className="icon-bg text-color text-lg sm:text-xl  w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full p-1.5 cursor-pointer">
          <BsChatDots />
        </div>
        {/* Profile */}
        <section className="flex items-center gap-1.5 sm:gap-3">
          <img
            src="https://images.unsplash.com/photo-1682687220866-c856f566f1bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60"
            className="icon-bg text-color text-xl w-8 h-8 md:w-9 md:h-9 flex justify-center items-center rounded-full cursor-pointer"
          />
          <div className="text-sm hidden md:flex flex-col">
            <span className="text-color font-semibold">Admin</span>
            <span className="text-gray-500 text-xs">apkistore.in</span>
          </div>
          <button onClick={() => setPop(!pop)}>
            {pop ? (
              <BsChevronUp className="text-color text-sm cursor-pointer" />
            ) : (
              <BsChevronDown className="text-color text-sm cursor-pointer" />
            )}
          </button>
        </section>

        {/* Popup */}
        {pop && (
          <div className="rounded p-3  gap-1.5 w-36 z-30 absolute top-16 sm:top-20 right-3   bg-white text-xs  grid text-left shadow">
            <span className="cursor-pointer">My Profile</span>
            <span className="cursor-pointer">Update Profile</span>
            <span
              onClick={() => {
                localStorage.clear();
                navigate("/");
                toast.success("LogOut Success!");
              }}
              className="cursor-pointer">
              Sign Out
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default Navbar;
