import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import taxRates from "../../constants";
import {PurchaseContext} from  '../../purchaseContext';
import Cart from '../Cart';


const Payment = () => {
  const { 
    purchaseModalVisible,
    setPurchaseModalVisible,
    shipToAddress,
    paymentInfo,
    setPaymentInfo, 
  } = React.useContext(PurchaseContext);

  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);
  const [paymentType, setPaymentType] = React.useState(null);

  const setPaymentMethod = (ev) => {
    setPaymentType(ev.target.value);
  }

  let taxRate = [0,0];
  if (shipToAddress && shipToAddress.Country && shipToAddress.Province) {
    taxRate = taxRates[shipToAddress.Country][shipToAddress.Province];
  }
  let subTotal = 0;
  let cartKeys = Object.keys(currentCart);
  cartKeys.forEach((key)=> {
    let price = currentCart[key].itemInfo.price;
    price = price.substring(1);
    subTotal += (Math.floor(100*(parseInt(currentCart[key].quantity))*parseFloat(price)))/100;
  })
  
  let shippingCost = 10;
  let provTaxCost = subTotal*taxRate[0];
  provTaxCost = (Math.floor(provTaxCost))/100;
  let fedTaxCost = subTotal*taxRate[1];
  fedTaxCost = (Math.floor(fedTaxCost))/100;
  if (shipToAddress.Country === "Canada") {
    shippingCost = 6;
  }
  let totalCost = shippingCost + provTaxCost + fedTaxCost + subTotal;

  return (
    <Wrapper>
      <RowDiv>
        <StyledButton
        onClick = {(ev) => setPaymentMethod(ev)}
        value = "VISA"
        paymentType = {paymentType}
        >
          VISA
        </StyledButton>
        <StyledButton
        onClick = {(ev) => setPaymentMethod(ev)}
        value = "MASTERCARD"
        paymentType = {paymentType}
        >
          MASTERCARD
        </StyledButton>
        <StyledButton
        onClick = {(ev) => setPaymentMethod(ev)}
        value = "AMERICAN-EXPRESS"
        paymentType = {paymentType}
        >
          AMERICAN-EXPRESS
        </StyledButton>
      </RowDiv>
      <RowDiv>
        <ColDiv>
          CARD NUMBER
          <input
          type = "Number"
          min = "0"
          max = "9999999999999999"
          >
          </input>
        </ColDiv>
      </RowDiv>
      <RowDiv>
        EXP
        <ColDiv>
          <label for="expirtationMonth">M</label>
          <select id="expirtationMonth">
            <option value="JA">01 - January</option>
            <option value="FE">02 - February</option>
            <option value="MR">03 - March</option>
            <option value="AP">04 - April</option>
            <option value="MA">05 - May</option>
            <option value="JN">06 - June</option>
            <option value="JL">07 - July</option>
            <option value="AU">08 - August</option>
            <option value="SE">09 - September</option>
            <option value="OC">10 - October</option>
            <option value="NO">11 - November</option>
            <option value="DE">12 - December</option>
          </select>
        </ColDiv>
        <ColDiv>
          <label for="expirtationYear">Y</label>
          <select id="expirtationYear">
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
          </select>
        </ColDiv>
      </RowDiv>
      <RowDiv>
        <ColDiv>
          SRC
          <input
          type = "Number"
          min = "0"
          max = "999"
          >
          </input>
        </ColDiv>
      </RowDiv>

      <RowDiv>
        SubTotal: ${subTotal}
      </RowDiv>
      {shipToAddress.Country === "Canada" ? (
        <RowDiv>
          PST: ${provTaxCost}
        </RowDiv>
      ) : (
        <RowDiv>
          State Tax: ${provTaxCost}
        </RowDiv>
      )}
      {shipToAddress.Country === "Canada" && (
        <RowDiv>
        Federal Tax: ${fedTaxCost}
      </RowDiv>
      )}
      {shipToAddress.Country === "Canada" ? (
        <RowDiv>
          Shipping: $6.00
        </RowDiv>
      ) : (
        <RowDiv>
          State Tax: $10.00
        </RowDiv>
      )}
      <RowDiv>
        Total: ${totalCost}
      </RowDiv>
    </Wrapper>
  );
};
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
`
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 10px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 20px;
`

const StyledButton = styled.button`
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  background: ${props => props.paymentType === props.value ? 'grey' : ''};
`

export default Payment;
