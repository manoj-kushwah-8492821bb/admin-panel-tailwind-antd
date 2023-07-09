import React from "react";
import Layout from "../../layouts";
import TopHeading from "../../common/TopHeading";
import { CustomCard } from "../../common/Classes";
import { BsPlus } from "react-icons/bs";
import Button from "../../common/Button";

const Admin = () => {
  return (
    <div>
      {/* Topbar */}
      <div className="flex justify-between items-center flex-row gap-2">
        <TopHeading title="Admins" />
        <TopHeading title="Total Admins : 15" />
      </div>

      {/* Tables */}
      <section className={`${CustomCard} my-4 flex justify-between`}>
        <div className="border flex icon-bg text-xs  rounded">
          <select className="rounded-l px-3 py-1.5 text-color outline-none">
            <option value="">Username</option>
            <option value="">Username</option>
            <option value="">Username</option>
            <option value="">Username</option>
            <option value="">Username</option>
            <option value="">Username</option>
          </select>
          <input
            type="text"
            placeholder="Search Username..."
            className="bg-transparent px-3 py-1.5"
          />
        </div>
        <Button icon={<BsPlus />} text="Create New" />
      </section>
    </div>
  );
};

export default Layout(Admin);
