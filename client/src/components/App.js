import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home/Home";
import ItemDetails from "../components/Items/ItemsDetails";
import Cart from "./Cart";

function App() {
  return (
    <React.Fragment>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login"></Route>
          <Route exact path="/item/:itemId">
            <ItemDetails />
          </Route>

          <Route exact path="/:userId/profile"></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

//fetch to back end with id with with useParams
