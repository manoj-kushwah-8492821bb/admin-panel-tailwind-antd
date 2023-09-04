// --------------- Auth Routes

import Login from "../pages/auth/Login";
// --------------- Dashboard Routes
import Dashboard from "../pages/dashboard";
import UserAnalytics from "../pages/dashboard/UserAnalytics";
import ServiceAnalytics from "../pages/dashboard/ServiceAnalytics";
import EarningAnalytics from "../pages/dashboard/EarningAnalytics";

// --------------- Master Routes
import Banners from "../pages/master/banners";
import Services from "../pages/master/Services";
import AffiliateBanners from "../pages/master/affiliate-banner";

// --------------- Users Routes
import KYC from "../pages/manage-users/KYC";
import Users from "../pages/manage-users/List/index";
import Withdraw from "../pages/manage-users/Withdraw";

// --------------- Wallet Routes
import GoPoint from "../pages/wallet/GoPoint";
import Balance from "../pages/wallet/Balance";
import PrimePoint from "../pages/wallet/PrimePoint";

// --------------- Shopping Routes
import ServiceArea from "../pages/serviceArea";
import Orders from "../pages/shoppings/orders";
import Products from "../pages/shoppings/products";
import Categories from "../pages/shoppings/categories";
import ViewOrder from "../pages/shoppings/orders/ViewOrder";
import SubCategories from "../pages/shoppings/sub-categories";
import ViewProduct from "../pages/shoppings/products/ViewProduct";
import BussiniessCategory from "../pages/shoppings/bussiness-Category";

// --------------- Merchants Routes
import Merchants from "../pages/merchants";
import RequestList from "../pages/merchants/request-list";
import ViewMerchant from "../pages/merchants/request-list/ViewMerchant";

// --------------- Refund Routes
import RechargeRefund from "../pages/refunds/rechargeRefund";

// --------------- Notifications Routes
import Notification from "../pages/notification";

// --------------- Transaction Routes
import Transactions from "../pages/transactions";

// --------------- Admin Routes
import Admin from "../pages/admin";

// --------------- Setting Routes
import Setting from "../pages/setting";

// --------------- Reports Routes
import Recharge from "../pages/reports/recharge";
import DthRecharge from "../pages/reports/dthRecharge";

// --------------- Affiliate Routes
import Affiliate from "../pages/affiliate";
import View from "../pages/affiliate/View";

// --------------- IP Address Routes
import WhitelistIp from "../pages/whitelist-ip";

const AllRoutes = [
  // --------------- Auth Routes
  { name: "Login", path: "/", element: <Login />, private: false },

  // --------------- Dashboard Routes
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

  // --------------- Master Routes
  {
    name: "Master Services",
    path: "/master/services",
    element: <Services />,
    private: true,
  },
  {
    name: "Master Banners",
    path: "/master/banners",
    element: <Banners />,
    private: true,
  },

  {
    name: "Master Affiliate Banners",
    path: "/master/affilliate-banners",
    element: <AffiliateBanners />,
    private: true,
  },

  // --------------- Users Routes
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

  // --------------- Wallet Routes
  {
    name: "Apki Store Wallet",
    path: "/wallet/balance",
    element: <Balance />,
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

  // --------------- Shopping Routes
  {
    name: "Category List",
    path: "/shopping/categories",
    element: <Categories />,
    private: true,
  },

  {
    name: "bussiniess Category",
    path: "/shopping/bussiness-categories",
    element: <BussiniessCategory />,
    private: true,
  },

  {
    name: "Sub Category List",
    path: "/shopping/sub-categories",
    element: <SubCategories />,
    private: true,
  },

  {
    name: "Orders",
    path: "/shopping/orders",
    element: <Orders />,
    private: true,
  },

  {
    name: "View Order",
    path: "/shopping/order/view",
    element: <ViewOrder />,
    private: true,
  },

  {
    name: "View Product",
    path: "/shopping/product/view",
    element: <ViewProduct />,
    private: true,
  },

  {
    name: "Products",
    path: "/shopping/products",
    element: <Products />,
    private: true,
  },

  {
    name: "Service Area",
    path: "/shopping/service-area",
    element: <ServiceArea />,
    private: true,
  },

  // --------------- Merchants Routes
  {
    name: "Merchants List",
    path: "/merchants/list",
    element: <Merchants />,
    private: true,
  },

  {
    name: "Merchants View",
    path: "/merchants/view",
    element: <ViewMerchant />,
    private: true,
  },

  {
    name: "Merchants Request List",
    path: "/merchants/request-list",
    element: <RequestList />,
    private: true,
  },

  // --------------- Refund Routes
  {
    name: "Recharge Refund",
    path: "/recharge-refund-requets",
    element: <RechargeRefund />,
    private: true,
  },

  // --------------- Notifigations Routes
  {
    name: "Notification",
    path: "/notification",
    element: <Notification />,
    private: true,
  },

  // --------------- Transaction Routes
  {
    name: "Transaction",
    path: "/transaction",
    element: <Transactions />,
    private: true,
  },

  // --------------- Admim Routes
  {
    name: "Admin",
    path: "/admin",
    element: <Admin />,
    private: true,
  },

  // --------------- Setting Routes
  {
    name: "Setting",
    path: "/setting",
    element: <Setting />,
    private: true,
  },
  // --------------- Reports Routes
  {
    name: "Recharge Report",
    path: "/report/recharge",
    element: <Recharge />,
    private: true,
  },
  {
    name: "DTH Recharge Report",
    path: "/report/dth",
    element: <DthRecharge />,
    private: true,
  },

  // --------------- Affiliate Routes
  {
    name: "Affiliate Store",
    path: "/affiliate",
    element: <Affiliate />,
    private: true,
  },
  {
    name: "Affiliate View",
    path: "/affiliate/view",
    element: <View />,
    private: true,
  },

  // --------------- IP Address Routes
  {
    name: "Whitelist IPs",
    path: "/whitelist-address",
    element: <WhitelistIp />,
    private: true,
  },
];

export default AllRoutes;
