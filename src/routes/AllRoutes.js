import Users from "../pages/users";
import Dashboard from "../pages/dashboard";

const AllRoutes = [
  {
    name: "Dashboard",
    path: "/",
    element: <Dashboard />,
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
