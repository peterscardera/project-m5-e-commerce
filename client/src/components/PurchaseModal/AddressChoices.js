import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { PurchaseContext } from "../../purchaseContext";

const AddressChoices = () => {
  const {
    purchaseModalVisible,
    setPurchaseModalVisible,
    shipToAddress,
    setShipToAddress,
  } = React.useContext(PurchaseContext);
  const [addressNum, setAddressNum] = React.useState(0);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);
  const user = useSelector((state) => state.user.user);

  const handleNavigation = () => {
    setPurchaseModalVisible(0);
  };

  let addressArray = [];
  let foundAddress = true;
  let i = 1;
  while (foundAddress) {
    let key = `address${i}`;
    if (user && user[key]) {
      addressArray.push(user[key]);
      i++;
    } else foundAddress = false;
  }

  const handleIncrementAddressNum = () => {
    setAddressNum(addressNum + 1);
  };
  const handleDecrementAddressNum = () => {
    setAddressNum(addressNum - 1);
  };
  const handleShipPreExisting = () => {
    setShipToAddress(addressArray[addressNum]);
    setPurchaseModalVisible(purchaseModalVisible + 1);
  };

  const handleShipNew = () => {};

  return (
    <RowDiv>
      {user ? (
        <>
          {addressArray.length === 0 ? (
            <ColDiv>You have no addresses in our database.</ColDiv>
          ) : (
            <ColDiv>
              <ChangeOption>
                <StyledButton
                  onClick={handleDecrementAddressNum}
                  disabled={addressNum === 0}
                >
                  Prev Address
                </StyledButton>
                <StyledButton
                  onClick={handleIncrementAddressNum}
                  disabled={addressNum === addressArray.length - 1}
                >
                  Next Address
                </StyledButton>
              </ChangeOption>
              <Address>
                <AddressConst>HOUSE NUMBER</AddressConst>
                <AddressModular>
                  {addressArray[addressNum].HouseNum}
                </AddressModular>
                <AddressConst>STREET NAME</AddressConst>
                <AddressModular>
                  {addressArray[addressNum].StreetName}
                </AddressModular>
                <AddressConst>CITY</AddressConst>
                <AddressModular>{addressArray[addressNum].City}</AddressModular>
                <AddressConst>
                  {addressArray[addressNum].Country === "Canada"
                    ? "PROVINCE / TERRITORY"
                    : "STATE"}
                </AddressConst>
                <AddressModular>
                  {addressArray[addressNum].Province}
                </AddressModular>
                <AddressConst>COUNTRY</AddressConst>
                <AddressModular>
                  {addressArray[addressNum].Country}
                </AddressModular>
                <AddressConst>
                  {addressArray[addressNum].Country === "Canada"
                    ? "POSTAL CODE"
                    : "ZIP CODE"}
                </AddressConst>
                <AddressModular>
                  {addressArray[addressNum].PostalCode}
                </AddressModular>
              </Address>
              <div></div>
              <StyledButton onClick={handleShipPreExisting}>
                SHIP TO THIS ADDRESS
              </StyledButton>
            </ColDiv>
          )}
        </>
      ) : (
        <ColDiv>
          <div>You are not signed in.</div>
          <NavLink onClick={handleNavigation} to="/account">
            SIGN IN or MAKE ACCOUNT
          </NavLink>
        </ColDiv>
      )}
    </RowDiv>
  );
};

const AddressConst = styled.div`
  color: lightgray;
`;
const AddressModular = styled.div``;
const Address = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  margin: 20px;
`;

const ChangeOption = styled.div``;
const StyledButton = styled.button`
  cursor: pointer;
`;
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 20px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 20px;
`;

export default AddressChoices;
