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
          className={`w-80 lg:w-80 md:w-96 shadow-2xl bg-white p-2 md:static absolute h-full border-r transition-all duration-50 ${
            drawer ? "md:hidden left-0" : "-left-full"
          }`}
        >
          <Sidebar handleToggle={handleToggle} />
        </section>

        {/* Navbar & Child */}
        <section className=" h-full w-full bg-[rgb(247,245,250)]">
          <Navbar handleToggle={handleToggle} />
          <div className="p-4">
            <Child />
          </div>
        </section>
      </div>
    );
  };
};

export default Layout;
