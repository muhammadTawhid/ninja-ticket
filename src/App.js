import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import Destination from "./components/Destination/Destination";
import Login from "./components/Login/Login";

export const userContext = createContext();

function App() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    img: "",
    pickFrom: "",
    pickTo: "",
  };
  const [signedInUser, setSignedInUser] = useState(initialState);

  return (
    <userContext.Provider value={[signedInUser, setSignedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/destination">
            <Destination />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
