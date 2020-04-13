import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestGalleryItems,
  receiveGalleryItems,
  receiveGalleryItemsError,
  requestVendors,
  receiveVendors,
  receiveVendorsError,
} from "../actions";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import {CartContext} from  '../cartContext';

import NavBar from "./Layout/NavBar";

import Shop from "./Shop/Shop";
import Home from "./Home/Home";
import ItemDetails from "../components/Items/ItemsDetails";
import Account from "./Account";
import Cart from "./Cart";

function App() {
  const allOfTheItems = useSelector((state) => state.gallery.items);
  const allOfTheVendors = useSelector((state) => state.vendors.items);
  const { cartVisible } = useContext(CartContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestGalleryItems());
    dispatch(requestVendors());
    const initialFetch = async () => {
      try {
        let storeData = await fetch("/getStore");
        if (storeData.status === 200) {
          let jsonData = await storeData.json();
          dispatch(receiveGalleryItems(jsonData));
        } else {
          console.log("error fetching store data");
          dispatch(receiveGalleryItemsError());
        }
        let vendorData = await fetch("/getVendors");
        if (vendorData.status === 200) {
          let jsonVendor = await vendorData.json();
          dispatch(receiveVendors(jsonVendor));
        } else {
          console.log("error fetching vendor data");
          dispatch(receiveVendorsError());
        }
      } catch (err) {
        console.log(err);
      }
    };
    initialFetch();

    //**add Promise all and dispatch that BOTH have been received so they both come in at same time
  }, []);

  return (
    <React.Fragment>
      <Router>
        <NavBar />
        {cartVisible && (
          <Cart/>
        )}
        <GlobalStyles />
          {allOfTheItems && allOfTheVendors && (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/shop">
                <Shop />
              </Route>
              <Route exact path="/login"></Route>
              <Route exact path="/item/:itemId">
                {/* only if fully loaded because we are not fetching on itemDetails */}
                <ItemDetails />
              </Route>
              <Route exact path="/account">
                <Account />
              </Route>
              <Route exact path="/:userId/profile"></Route>
            </Switch>
          )}
        </Router>
    </React.Fragment>
  );
}

export default App;

//fetch to back end with id with with useParams
