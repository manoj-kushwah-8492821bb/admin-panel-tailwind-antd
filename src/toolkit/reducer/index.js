import authReducer from "./authReducer";
import userReducer from "./userReducer";
import reportReducer from "./reportReducer";
import serviceReducer from "./serviceReducer";
import rechargeReducer from "./rechargeReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = {
  authReducer,
  serviceReducer,
  userReducer,
  notificationReducer,
  reportReducer,
  rechargeReducer,
};

export default rootReducer;
