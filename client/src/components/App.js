import React, { useEffect, useContext, useCallback } from "react";
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
import GlobalStyles from "./GlobalStyles";
import { CartContext } from "../cartContext";
import { PurchaseContext } from "../purchaseContext";

import NavBar from "./Layout/NavBar";

import Shop from "./Shop";
import Home from "./Home";
import ItemDetails from "../components/Items/ItemsDetails";
import Account from "./Account";
import Cart from "./Cart";
import PurchaseModal from "./PurchaseModal";
import ExistingAccount from "./Account/ExistingAccount";

import Footer from "./Layout/Footer";

function App() {
  const allOfTheItems = useSelector((state) => state.gallery.items);
  const allOfTheVendors = useSelector((state) => state.vendors.items);
  const loggedInUser = useSelector((state) => state.user.user);
  const cartStatus = useSelector((state) => state.orders.status);
  const { cartVisible } = useContext(CartContext);
  const { purchaseModalVisible, setPurchaseModalVisible } = useContext(
    PurchaseContext
  );

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

  const handleEscape = useCallback((ev) => {
    if (
      !purchaseModalVisible &&
      cartStatus === "idle" &&
      (ev.key === "Escape" || ev.code === "Escape" || ev.keyCode === 27)
    ) {
      setPurchaseModalVisible(0);
    }
    console.log("button test");
  });
  React.useEffect(() => {
    document.addEventListener("keydown", (ev) => handleEscape(ev));
    return () => {
      document.removeEventListener("keydown", (ev) => handleEscape(ev));
    };
  }, []);

  return (
    <React.Fragment>
      <Router>
        <NavBar />
        {cartVisible && <Cart />}
        {!!purchaseModalVisible && <PurchaseModal />}
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
            <Route exact path="/userInformation">
              <ExistingAccount loggedInUser={loggedInUser}></ExistingAccount>
            </Route>
            <Route exact path="/account">
              <Account />
            </Route>
            <Route exact path="/:userId/profile"></Route>
          </Switch>
        )}
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;
