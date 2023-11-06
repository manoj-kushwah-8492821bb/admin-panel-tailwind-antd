import { Link } from "react-router-dom";
import Heading from "../../common/Heading";
import Layout from "../../layouts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { dashboardApi } from "../../toolkit/action/dashboard.action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboardData } = useSelector((state) => state.dashboardReducer);
  console.log(dashboardData);
  const arr = dashboardData.map((item) => {
    const path = () => {
      switch (item.name) {
        case "Products":
          return "/shopping/products";

        case "Users":
          return "/users/list";

        case "Orders":
          return "/shopping/orders";
        case "Category":
          return "/shopping/categories";
        case "Merchants":
          return "/merchants/list";
      }
    };
    return { ...item, path: path() };
  });
  // const arr = [
  //   {
  //     name: "Products",
  //     path: "/products",
  //     total: 97,
  //   },
  //   {
  //     name: "Orders",
  //     path: "/orders",
  //     total: 56,
  //   },
  // ];
  useEffect(() => {
    dispatch(dashboardApi());
  }, [dispatch]);
  return (
    <div className="tracking-wider pt-4  notification-container pb-12 overflow-auto h-full">
      <Heading title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-4 lg:gap-8">
        {arr.map((item) => {
          return (
            <div
              key={item.name}
              className="flex flex-col rounded-lg shadow-sm bg-white overflow-hidden  "
            >
              {/* Body */}
              <div className="p-5 grow flex justify-between items-center">
                <dl className="space-y-1">
                  <dt className="text-2xl font-bold">{item.count}</dt>
                  <dd className="uppercase font-semibold text-sm text-gray-500 tracking-wider ">
                    {item.name}
                  </dd>
                </dl>
              </div>
              {/* END Body */}

              {/* Action Link */}
              <Link
                to={item.path}
                className="block p-3 font-medium text-sm text-center text-white bg-[#DC8D00]"
              >
                View All {item.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Layout(Dashboard);
