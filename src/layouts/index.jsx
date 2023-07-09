import React, { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (Child) => {
  return function Component() {
    const [drawer, setDrawer] = useState(false);
    const handleToggle = () => setDrawer(!drawer);
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <section
          className={`w-80 z-50 lg:w-80 md:w-96 md:border-r border-gray-200 bg-white p-2 md:static absolute h-full transition-all duration-50 ${
            drawer ? "md:hidden left-0" : "-left-full"
          }`}
        >
          <Sidebar handleToggle={handleToggle} />
        </section>

        {/* Navbar & Child */}
        <section className=" h-full w-full bg-[rgb(247,245,250)]">
          <Navbar handleToggle={handleToggle} drawer={drawer} />
          <div className="p-4">
            <Child />
          </div>
        </section>
      </div>
    );
  };
};

export default Layout;
