import React, { useState } from "react";
import { TbAffiliate, TbReportSearch } from "react-icons/tb";
import {
  AiFillShopping,
  AiOutlineGlobal,
  AiOutlineTransaction,
} from "react-icons/ai";
import { FaUsers, FaWallet } from "react-icons/fa";
import { BsChevronDown, BsChevronUp, BsGear } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSolidHome } from "react-icons/bi";
import { MdClose, MdNotifications, MdTouchApp } from "react-icons/md";
import { PiUsersThreeThin } from "react-icons/pi";
import { SiInternetexplorer } from "react-icons/si";

import Logo from "../assets/Logo.png";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const { handleToggle } = props;
  const { pathname } = useLocation();
  const [dropValue, setDropValue] = useState("");

  // Handle Navigate
  const handleNavigate = (path) => navigate(path);

  // Handle Dropdown
  const handleDrop = (value) => setDropValue(value === dropValue ? "" : value);

  // All Links & Nested Links
  const navLinks = [
    // Dashboard
    {
      name: "Dashboard",
      icon: <BiSolidHome />,
      path: "",
      child: [
        { name: "User Analytics", path: "/dashboard/user-analytics" },
        { name: "Services", path: "/dashboard/service-analytics" },
        { name: "Earnings", path: "/dashboard/earning-analytics" },
      ],
    },

    // Master
    {
      name: "Master",
      icon: <MdTouchApp />,
      path: "",
      child: [
        { name: "Services", path: "/master/services" },
        // { name: "Operators", path: "/master/operators" },
        // { name: "Commission / API Setting", path: "/master/commission" },
        { name: "Banners", path: "/master/banners" },
      ],
    },

    // Shopping

    {
      name: "Shopping",
      icon: <AiFillShopping />,
      path: "/shopping",
      child: [
        { name: "Category", path: "/shopping/categories" },
        { name: "Sub Category", path: "/shopping/sub-categories" },
        { name: "Products", path: "/shopping/products" },
        { name: "Orders", path: "/shopping/orders" },
        { name: "Service Area", path: "/shopping/service-area" },
      ],
    },

    // Manage User
    {
      name: "Manage User",
      icon: <FaUsers />,
      path: "/manage-users",
      child: [
        { name: "List", path: "/users/list" },
        { name: "KYC Requests", path: "/users/kyc-list" },
        { name: "Withdraw Requests", path: "/users/withdraw" },
      ],
    },

    // Manage Merchants
    {
      name: "Merchants",
      icon: <PiUsersThreeThin />,
      path: "/merchants",
      child: [
        { name: "List", path: "/merchants/list" },
        { name: "Request List", path: "/merchants/request-list" },
      ],
    },

    // Wallet
    {
      name: "Wallet",
      icon: <FaWallet />,
      path: "",
      child: [
        { name: "ApkiStore Wallet", path: "/wallet/balance" },
        { name: "Go Point", path: "/wallet/go-points" },
        { name: "Prime Point", path: "/wallet/prime-points" },
        // { name: "ApkiStore Merchant", path: "/wallet/merchant" },
      ],
    },

    // Reports
    {
      name: "Reports",
      icon: <TbReportSearch />,
      path: "",
      child: [
        { name: "Service", path: "" },
        { name: "Mobile Recharge", path: "/report/recharge" },
        { name: "Dth Recharge", path: "/report/dth" },
        { name: "API Sales", path: "" },
        { name: "Pending Recharge", path: "" },
        { name: "Update Recharge", path: "" },
        { name: "SMS Report", path: "" },
        { name: "ApkiStore Wallet", path: "" },
        { name: "Go Point", path: "" },
        { name: "Prime Point", path: "" },
        { name: "Payment Gateway", path: "" },
        { name: "Bus Booking", path: "" },
        { name: "Flight Booking", path: "" },
      ],
    },

    // Global Configuration
    {
      name: "Refund Requests",
      icon: <AiOutlineGlobal />,
      path: "/recharge-refund-requets",
    },

    // Transactions
    {
      name: "Transactions",
      icon: <AiOutlineTransaction />,
      path: "/transaction",
    },

    // Notification
    {
      name: "Notification",
      icon: <MdNotifications />,
      path: "/notification",
    },

    {
      name: "Affiliate Store",
      icon: <TbAffiliate />,
      path: "/affiliate",
    },
    {
      name: "IP Address",
      icon: <SiInternetexplorer />,
      path: "/whitelist-address",
    },

    {
      name: "Setting",
      icon: <BsGear />,
      path: "/setting",
    },
  ];

  return (
    <div>
      {/* Top Logo & Close */}
      <section className="flex py-2 px-4 items-center md:justify-center justify-between">
        <img src={Logo} alt="sidebar-logo" className="w-36" />
        <MdClose
          onClick={handleToggle}
          className="text-color text-xl md:hidden cursor-pointer"
        />
      </section>

      {/* NavLinks */}
      <nav className="my-7 grid gap-4 tracking-wide text-sm px-4 text-[rgb(145,145,145)]">
        {navLinks.map((item) => {
          return (
            <div key={item.name}>
              <div
                type="button"
                onClick={() =>
                  !item.child
                    ? handleNavigate(item.path)
                    : handleDrop(item.name)
                }
                className={`flex cursor-pointer font-medium  text-hover items-center gap-4 ${
                  (item.name === dropValue || item.path === pathname) &&
                  "text-color"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
                {item.child && (
                  <span className="ml-auto">
                    {item.name === dropValue ? (
                      <BsChevronUp />
                    ) : (
                      <BsChevronDown />
                    )}
                    {/* <BsChevronUp /> */}
                  </span>
                )}
              </div>
              {/* Child Links */}
              {item.name === dropValue && (
                <div className="ml-8 grid gap-2 my-2.5">
                  {item?.child?.map((subItem) => {
                    return (
                      <div
                        key={subItem.name}
                        onClick={() => handleNavigate(subItem.path)}
                        className={`flex font-normal  cursor-pointer text-hover gap-3 ${
                          subItem.path === pathname && "text-color"
                        }`}
                      >
                        - <span>{subItem.name}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
