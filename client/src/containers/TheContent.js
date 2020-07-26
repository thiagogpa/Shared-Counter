import React, { Suspense, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import axios from "axios";

// routes config
import routesLoggedIN from "../routes";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

function TheContent() {
  const [routes, setRoutes] = useState(routesLoggedIN);

  let axiosInstance = axios.create({
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
    baseURL: process.env.REACT_APP_BACKEND,
  });

  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    component={route.component}
                  />
                )
              );
            })}
            
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
}

export default React.memo(TheContent);
