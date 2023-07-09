import Users from "../pages/users";
import Dashboard from "../pages/dashboard";
import UserAnalytics from "../pages/dashboard/UserAnalytics";

const AllRoutes = [
  // -------------Dashboard Routes--------------//
  {
    name: "Dashboard",
    path: "/",
    element: <Dashboard />,
    private: true,
  },
  {
    name: "User Analytics",
    path: "/dashboard/user-analytics",
    element: <UserAnalytics />,
    private: true,
  },
  {
    name: "Users",
    path: "/users",
    element: <Users />,
    private: true,
  },
];

export default AllRoutes;
