import userReducer from "./userReducer";
import authReducer from "./authReducer";
import reportReducer from "./reportReducer";
import serviceReducer from "./serviceReducer";
import rechargeReducer from "./rechargeReducer";
import shoppingReducer from "./shoppingReducer";
import dashboardReducer from "./dashboardReducer";
import affiliateReducer from "./affiliateReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = {
  authReducer,
  serviceReducer,
  userReducer,
  notificationReducer,
  dashboardReducer,
  reportReducer,
  rechargeReducer,
  shoppingReducer,
  affiliateReducer,
};

export default rootReducer;
