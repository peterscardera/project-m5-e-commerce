import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExistingAccount from "../Account/ExistingAccount";
import { logUserOut, emptyCartSuccess } from "../../actions";
import { CartContext } from "../../cartContext";
import supermarket from "./supermarket.png";

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
      // console.log(name);
      setAccountTitle(newAccountTitle);
      // console.log(accountTitle);
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
              <button onClick={handleSignOut} class="signOutBtn">
                SIGN OUT
              </button>
            )}
          </NavLink>
          <CartBtnWrapper>
            <img src={supermarket} alt="cart button" />
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
          </CartBtnWrapper>
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
  img {
    width: auto;
    height: 25px;
    margin-top: 10px;
  }
  .signOutBtn {
    margin: -10px;
    padding: 5px;
    border: none;
    background: none;
    min-width: 100px;
    min-height: 45px;
    font-size: 20px;
    padding: 5px;
  }
`;

const CartBtnWrapper = styled.div``;

const CartButton = styled.button`
  color: black;
  padding: 0;
  border: none;
  background: none;
  min-width: 100px;
  min-height: 45px;
  font-size: 18px;
  padding: 5px;
  margin-top: -5px;
  &:hover {
    color: white;
    border-bottom: 2px solid white;
    cursor: pointer;
  }
`;

export default NavBar;
