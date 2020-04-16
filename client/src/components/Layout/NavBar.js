import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ExistingAccount from "../Account/ExistingAccount";
import { 
  logUserOut,
  emptyCartSuccess
} from "../../actions";
import {CartContext} from  '../../cartContext';


const NavBar = () => {
  const { cartVisible, setCartVisible } = useContext(CartContext);
  const { clickStatus, setClickStatus } = useContext(CartContext);
  const [cartVisibilityPreHover, setCartVisibilityPreHover] = useState(
    cartVisible
  );
  const [accountTitle, setAccountTitle] = useState("MY ACCOUNT");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(()=>{
    // if (user) console.log(user.givenName);
    if (user && user.givenName) {
      let name = user.givenName;
      name = name.toUpperCase();
      let newAccountTitle = `${name}'S ACCOUNT`;
      console.log(name);
      setAccountTitle(newAccountTitle);
      console.log(accountTitle);
    }
  }, [user]);
  const currentCart = useSelector((state) => state.orders.currentCart);
  let cartNum = Object.keys(currentCart).length;

  const handleSignOut = () => {
    console.log("signing out...");
    dispatch(logUserOut());
    dispatch(emptyCartSuccess());
  };

  return (
    <>
      <header>
        <NavWrapper>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/shop">SHOP</NavLink>
          {user === null ? (
              <NavLink to="/account">
                ACCOUNT
              </NavLink>
            ) : (
              <NavLink to="/userInformation">
                {accountTitle}
           
              </NavLink>
            )}
          <NavLink to="/account">
            {user === null ? (
              "SIGN IN"
            ) : (
              <button
              onClick = {handleSignOut}
              >
                "SIGN OUT"
              </button>
            )}
          </NavLink>
          <CartButton
            onMouseEnter={() => {
              setCartVisibilityPreHover(cartVisible);
              setCartVisible(true);
            }}
            onMouseLeave={() => {
              if (cartVisibilityPreHover && clickStatus) setCartVisible(true);
              else if (cartVisibilityPreHover && !clickStatus)
                setCartVisible(false);
              else if (!cartVisibilityPreHover && clickStatus)
                setCartVisible(true);
              else if (!cartVisibilityPreHover && !clickStatus)
                setCartVisible(false);
            }}
            onClick={() => {
              setClickStatus(!clickStatus);
            }}
          >
            {cartNum > 0 ? `CART (${cartNum})` : "CART"}
          </CartButton>
        </NavWrapper>
      </header>
    </>
  );
};

// once you click on account, we can have our sign in / create account, and even a wishlist! //
// hover menu over "shop" - shop all, shop categories
const NavWrapper = styled.nav`
  background: lightgrey;
  margin-top: 10px;
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  a {
    padding: 5px;
    color: black;
    text-decoration: none;
    @media screen and (max-width: 420px) {
      flex: 100%;
      font-size: 16px;
    }
  }
  a:hover {
    color: white;
    //text-decoration: underline;
    border-bottom: 2px solid white;
  }
`;
const CartButton = styled.button`
  background: black;
  color: white;
  min-width: 100px;
  min-height: 45px;
  font-size: 18px;
  padding: 5px;
  margin-top: -5px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;
export default NavBar;
