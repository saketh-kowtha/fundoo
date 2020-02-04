import React from "react";
import { Route, Redirect } from "react-router-dom";
import {isAuthenticated} from "./auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated() && rest.role === "login")
            return (
                <Redirect
                to={{
                    pathname: "/Dashboard",
                    state: {
                    from: props.location
                    }
                }}
                />
            );
        else if (isAuthenticated() && rest.role !== "login") {
          return <Component {...props} />;
        } 
        else if (!isAuthenticated() && rest.role === "login") {
            return <Component {...props} />;
        } 
        else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};


export default ProtectedRoute