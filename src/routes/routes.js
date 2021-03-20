import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Login, Register, CampaignList, NoteConsole } from "../components";
import CampaignForm from "../components/campaigns/form/CampaignForm";

const ROUTES = [
  {
    path: "/",
    exact: true,
    key: "HOME",
    component: () => <Redirect to={"/app"} />,
  },
  { path: "/login", exact: true, key: "LOGIN", component: Login },
  { path: "/register", exact: true, key: "REGISTER", component: Register },
  {
    path: "/app",
    key: "APP",
    exact: false,
    component: (props) => {
      if (!localStorage.getItem("jwt")) {
        return <Redirect to={"/login"} />;
      } else {
        return <RenderRoutes {...props} />;
      }
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: CampaignList,
      },
      {
        path: "/app/notes",
        key: "NOTE_CONSOLE",
        exact: true,
        component: NoteConsole,
      },
      {
        path: "/app/newcampaign",
        key: "NEW_CAMPAIGN_WIZARD",
        exact: false,
        component: (props) => <RenderRoutes {...props} />,
        routes: [
          {
            path: "/app/newcampaign",
            key: "NEW_CAMPAIGN_FORM",
            exact: true,
            component: (props) => <CampaignForm create {...props} />,
          },
          {
            path: "/app/newcampaign/character",
            key: "STARTING_CHARACTER_FORM",
            exact: true,
            component: () => (
              <div>
                <div>Character</div>
                <div>Character</div>
                <div>Character</div>
                <div>Character</div>
              </div>
            ),
          },
          {
            path: "/app/newcampaign/location",
            key: "STARTING_LOCATION_FORM",
            exact: true,
            component: () => (
              <div>
                <div>Location</div>
                <div>Location</div>
                <div>Location</div>
                <div>Location</div>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    exact: true,
    key: "NOT_FOUND",
    component: () => <div>Not a valid route</div>,
  },
];

function ConstructedRoute(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route) => (
        <ConstructedRoute key={route.key} {...route} />
      ))}
    </Switch>
  );
}

export default ROUTES;
