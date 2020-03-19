import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../components/login/Login";
import Navbar from "../components/navbar/Navbar";

const ROUTES = [
  { path: "/login", exact: true, key: "LOGIN", component: Login },
  {
    path: "/app",
    exact: true,
    key: "APP",
    component: props => {
      if (!localStorage.getItem("jwt")) {
        return <Redirect to={"/login"} />;
      } else {
        return <RenderRoutes {...props} />;
      }
    },
    routes: [
      {
        path: "/app",
        key: "NAV_BAR",
        component: Navbar
      },
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App home!</h1>
      }
    ]
  }
];

function ConstructedRoute(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map(route => (
        <ConstructedRoute key={route.key} {...route} />
      ))}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}

export default ROUTES;
