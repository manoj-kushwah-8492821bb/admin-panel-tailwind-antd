import authReducer from "./authReducer";
import userReducer from "./userReducer";
import reportReducer from "./reportReducer";
import serviceReducer from "./serviceReducer";
import shoppingReducer from "./shoppingReducer";
import rechargeReducer from "./rechargeReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = {
  authReducer,
  serviceReducer,
  userReducer,
  notificationReducer,
  reportReducer,
  rechargeReducer,
  shoppingReducer,
};

export default rootReducer;
