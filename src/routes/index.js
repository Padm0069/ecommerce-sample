

import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { registerNav } from "../modules/Navigation";
import { createBrowserHistory } from "history";
import PageNotFound from "../views/PageNotFound";
import HomeRoutes from "./HomeRoutes";
import Auth from "../modules/Auth";

const PrivateRouter = ({ component, ...options }) => {
  const finalComponent =
    Auth.getUserDetails() !== undefined &&
    Auth.getUserDetails() !== null &&
    Auth.getToken() !== undefined ? (
      <Route {...options} component={component} />
    ) : (
      <Redirect to="/PageNotFound" />
    );

  return finalComponent;
};

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const browserHistory = createBrowserHistory();

    return (
      <div>
        <Router ref={registerNav}>
          <Switch>
            {HomeRoutes.map((homeRoute, index) => {
              return (
                <Route
                  key={index}
                  path={homeRoute.path}
                  exact={homeRoute.exact}
                  component={props => {
                    return (
                      <homeRoute.layout {...props}>
                        <homeRoute.component {...props} />
                      </homeRoute.layout>
                    );
                  }}
                />
              );
            })}
            <Route Redirect to="/PageNotFound" exact component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Routes;
