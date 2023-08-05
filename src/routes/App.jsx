import React from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";

import AllRoutes from "./AllRoutes";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

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
