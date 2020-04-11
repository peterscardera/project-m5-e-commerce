import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <>
      <header>
        <NavWrapper>
          <a href="/"> HOME </a>
          <a href="/shop">SHOP</a>
          <a href="/account">ACCOUNT</a>
          <a href="/cart">CART</a>
        </NavWrapper>
      </header>
    </>
  );
};

// once you click on account, we can have our sign in / create account, and even a wishlist! //

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
  }
`;

export default NavBar;
