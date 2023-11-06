import "../App.css";
import React from "react";
import AllRoutes from "./AllRoutes";
import PublicRoute from "./PublicRoute";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        {AllRoutes.map((item) => {
          const { name, path, element } = item;
          return (
            <Route
              key={name}
              element={item.private ? <PrivateRoute /> : <PublicRoute />}
            >
              <Route name={name} path={path} element={element} exact={true} />
            </Route>
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
