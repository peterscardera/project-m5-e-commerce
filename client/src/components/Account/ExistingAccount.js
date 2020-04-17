import styled from "styled-components";
import React from "react";
import { useSelector } from "react-redux";

import OrderHistoryComponent from './OrderHistory';

//reminder: This is a child component of Account.js if user !null then take the user info and render this
function ExistingAccount({ loggedInUser }) {
  const [addressNum, setAddressNum] = React.useState(0);
  const user = useSelector((state) => state.user.user);

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

  console.log(loggedInUser);
  return (
    <>
      <TopWrapper>
        <div>WELCOME BACK {loggedInUser.givenName} </div>
      </TopWrapper>
      <MidWrapper>
        <AccountDetails>
          <h2>ACCOUNT DETAILS</h2>
          <ColDiv>
            <AddressConst>NAME</AddressConst>
            <AddressModular>{loggedInUser.givenName}</AddressModular>
            <AddressConst> EMAIL </AddressConst>
            <AddressModular>{loggedInUser.email}</AddressModular>
            <AddressConst>PASSWORD</AddressConst>
            <AddressModular>RESET PASSWORD HERE</AddressModular>
          </ColDiv>
        </AccountDetails>

        <SavedAddresses>
          <h2>SAVED ADDRESSES</h2>

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
            </ColDiv>
          )}
        </SavedAddresses>
        <OrderHistory>
          <h2>ORDER DETAILS</h2>
          <ColDiv>
            <OrderHistoryComponent>

            </OrderHistoryComponent>
          </ColDiv>
        </OrderHistory>
      </MidWrapper>
    </>
  );
}

const TopWrapper = styled.div`
  font-size: 30px;
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  background: black;
  color: white;
  padding: 50px;
`;
const MidWrapper = styled.div`
  font-size: 15px;
  display: flex;
  flex-wrap: wrap;
  h2 {
    text-align: center;
  }
  padding: 20px;
`;
const AccountDetails = styled.div`
  flex: 33.33%;
  border-right: solid black 2px;
`;
const SavedAddresses = styled.div`
  flex: 33.33%;
  border-right: solid black 2px;
`;
const OrderHistory = styled.div`
  flex: 33.33%;
`;

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
  background-color: black;
  color: white;
  padding: 10px;
  max-width: 150px;
  margin: 10px auto;
  &:disabled {
    cursor: not-allowed;
    background: grey;
  }
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

// const RowDiv = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   height: 50vh;
//   min-height: 400px;
//   margin: 20px;
// `;

export default ExistingAccount;
