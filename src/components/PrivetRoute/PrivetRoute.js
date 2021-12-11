import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { userContext } from "../../App";

const PrivetRoute = ({ children, ...rest }) => {
  const [signedInUser] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        signedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivetRoute;
