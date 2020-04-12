import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  requestGalleryItems,
  receiveGalleryItems,
  receiveGalleryItemsError,
} from "../actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";

import NavBar from "./Layout/NavBar";

import Shop from "./Shop/Shop";
import Home from "./Home/Home";
import ItemDetails from "../components/Items/ItemsDetails";
import Account from "./Account";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGalleryItems());
    const getStore = async () => {
      try {
        let data = await fetch("/getStore");
        if (data.status === 200) {
          let jsonData = await data.json();
          dispatch(receiveGalleryItems(jsonData));
        } else {
          console.log("error fetching data");
          dispatch(receiveGalleryItemsError());
        }
      } catch (err) {
        console.log(err);
      }
    };
    getStore();

    //add get vendors
  }, []);

  return (
    <React.Fragment>
      <NavBar />
      <Router>
        <GlobalStyles />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/login"></Route>
          <Route exact path="/item/:itemId">
            <ItemDetails />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/:userId/profile"></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

//fetch to back end with id with with useParams
