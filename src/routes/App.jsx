import React from "react";
import "../App.css";
import { Route, Routes } from "react-router-dom";

import AllRoutes from "./AllRoutes";

const App = () => {
  return (
    <div>
      <Routes>
        {AllRoutes.map((item) => {
          const { name, path, element } = item;
          return (
            <Route>
              <Route name={name} path={path} element={element} exact={true} />
            </Route>
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
