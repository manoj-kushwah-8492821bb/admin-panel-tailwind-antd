import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { PiUsersFill } from "react-icons/pi";

import Layout from "../../layouts";
import TopHeading from "../../common/TopHeading";
import { CustomCard } from "../../common/Classes";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const UserAnalytics = () => {
  const dummy = [
    {
      name: "Today Mobile Recharges",
    },
    {
      name: "Total Impressions",
    },
    {
      name: "Active Users",
    },
    {
      name: "Active Users",
    },
  ];
  return (
    <div>
      {/* Topbar */}
      <div className="flex justify-between sm:flex-row gap-2 flex-col py-2.5">
        <TopHeading title="User Analytics" />
        <RangePicker
          defaultValue={[
            dayjs("2015/01/01", dateFormat),
            dayjs("2015/01/01", dateFormat),
          ]}
          format={dateFormat}
        />
      </div>
      {/* Cards */}
      <section className="grid my-3 gap-5 md:grid-cols-3 grid-cols-2 lg:grid-cols-4">
        {dummy.map((item, index) => {
          return (
            <div key={index} className={CustomCard}>
              <div className="grid gap-1 sm:gap-1.5">
                <h4>{item.name}</h4>
                <div className="text-base font-semibold">15,45,94,225</div>
              </div>
              <span className="text-xl font-bold text-purple-300">
                <PiUsersFill />
              </span>
            </div>
          );
        })}
      </section>

      {/* Table */}
      <div className={CustomCard}>
        <h3 className="text-lg">Recent Costumer</h3>
      </div>
    </div>
  );
};

export default Layout(UserAnalytics);
