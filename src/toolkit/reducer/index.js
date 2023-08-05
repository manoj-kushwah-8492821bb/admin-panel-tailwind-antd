import authReducer from "./authReducer";
import userReducer from "./userReducer";
import serviceReducer from "./serviceReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = {
  authReducer,
  serviceReducer,
  userReducer,
  notificationReducer,
};

export default rootReducer;
