import Admin from "../pages/admin";
import Wallet from "../pages/wallet";
import Dashboard from "../pages/dashboard";
import GoPoint from "../pages/wallet/GoPoint";
import Services from "../pages/master/Services";
import Merchant from "../pages/wallet/Merchant";
import ManageUsers from "../pages/manage-users";
import Notification from "../pages/notification";
import Operators from "../pages/master/Operators";
import Commission from "../pages/master/Commission";
import PrimePoint from "../pages/wallet/PrimePoint";
import GlobalConfig from "../pages/global-configuration";
import UserAnalytics from "../pages/dashboard/UserAnalytics";
import ServiceAnalytics from "../pages/dashboard/ServiceAnalytics";
import EarningAnalytics from "../pages/dashboard/EarningAnalytics";
import Convenience from "../pages/convenience";
import Coupon from "../pages/coupon";
import Login from "../pages/auth/Login";
import Users from "../pages/manage-users/List/index";
import KYC from "../pages/manage-users/KYC";
import Withdraw from "../pages/manage-users/Withdraw";

const AllRoutes = [
  {
    name: "Login",
    path: "/",
    element: <Login />,
    private: false,
  },
  // -------------Dashboard Routes--------------//
  {
    name: "Dashboard",
    path: "/dashboard",
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
    name: "Services Analytics",
    path: "/dashboard/service-analytics",
    element: <ServiceAnalytics />,
    private: true,
  },
  {
    name: "Earnings Analytics",
    path: "/dashboard/earning-analytics",
    element: <EarningAnalytics />,
    private: true,
  },

  // ------------------- Master --------------- //
  {
    name: "Master Services",
    path: "/master/services",
    element: <Services />,
    private: true,
  },
  {
    name: "Master Operators",
    path: "/master/operators",
    element: <Operators />,
    private: true,
  },

  // ------------------- Users --------------- //
  {
    name: "User List",
    path: "/users/list",
    element: <Users />,
    private: true,
  },
  {
    name: "KYC Request",
    path: "/users/kyc-list",
    element: <KYC />,
    private: true,
  },

  {
    name: "Withdraw Requests",
    path: "/users/withdraw",
    element: <Withdraw />,
    private: true,
  },

  {
    name: "Commission Api setting",
    path: "/master/commission",
    element: <Commission />,
    private: true,
  },

  // ------------------- Wallet --------------- //
  {
    name: "Apki Store Wallet",
    path: "/wallet",
    element: <Wallet />,
    private: true,
  },
  {
    name: "Go Point",
    path: "/wallet/go-points",
    element: <GoPoint />,
    private: true,
  },
  {
    name: "Prime Point",
    path: "/wallet/prime-points",
    element: <PrimePoint />,
    private: true,
  },
  {
    name: "ApkiStore Merchant",
    path: "/wallet/merchant",
    element: <Merchant />,
    private: true,
  },

  // ----------- Other ------------ //

  {
    name: "Manage Users",
    path: "/manage-users",
    element: <ManageUsers />,
    private: true,
  },

  {
    name: "Coupon Master",
    path: "/coupon-master",
    element: <Coupon />,
    private: true,
  },

  {
    name: "Convenience Master",
    path: "/convenience-master",
    element: <Convenience />,
    private: true,
  },

  {
    name: "Global Configuration",
    path: "/global-configuration",
    element: <GlobalConfig />,
    private: true,
  },

  {
    name: "Notification",
    path: "/notification",
    element: <Notification />,
    private: true,
  },

  {
    name: "Admin",
    path: "/admin",
    element: <Admin />,
    private: true,
  },
];

export default AllRoutes;
