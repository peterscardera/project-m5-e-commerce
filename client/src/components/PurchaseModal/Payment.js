import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import taxRates from "../../constants";
import {PurchaseContext} from  '../../purchaseContext';

import {
  requestPurchase,
  purchaseSuccess,
  purchaseError,
  receiveUserInfo,
  receiveGalleryItems,
  receiveOrdersSuccess,
} from "../../actions";
import { ip } from "../../constantsB";


const Payment = () => {

  const { 
    purchaseModalVisible,
    setPurchaseModalVisible,
    shipToAddress,
    setShipToAddress,
    setPaymentInfo, 
    setLastConfirmedOrderNum,
  } = React.useContext(PurchaseContext);

  const currentCart = useSelector((state) => state.orders.currentCart);
  const userInfo = useSelector((state) => state.user.user);
  const [paymentType, setPaymentType] = React.useState(null);
  const [creditCardNumber, setCreditCardNumber] = React.useState(null);
  const [expirationMonth, setExpirationMonth] = React.useState("01");
  const [expirationYear, setExpirationYear] = React.useState("2020");
  const [srcNumber, setsrcNumber] = React.useState(null);
  const [validExpiration, setValidExpiration] = React.useState(false);
  const [validCardNum, setValidCardNum] = React.useState(false);
  const [validSrcNum, setValidSrcNum] = React.useState(false);
  const [readyToPurchase, setReadyToPurchase] = React.useState(false);

  const reduxDispatch = useDispatch();

  React.useEffect(()=>{
    const today = Date();
    let currentMonth = today.slice(4,7);
    switch(currentMonth){
      case "Jan" : currentMonth = 1; break;
      case "Feb" : currentMonth = 2; break;
      case "Mar" : currentMonth = 3; break;
      case "Apr" : currentMonth = 4; break;
      case "May" : currentMonth = 5; break;
      case "Jun" : currentMonth = 6; break;
      case "Jul" : currentMonth = 7; break;
      case "Aug" : currentMonth = 8; break;
      case "Sep" : currentMonth = 9; break;
      case "Oct" : currentMonth = 10; break;
      case "Nov" : currentMonth = 11; break;
      case "Dec" : currentMonth = 12; break;
      default: currentMonth = undefined;
    }
    let currentYear = today.slice(11,15);
    let pastExpiration = false;
    if (parseInt(expirationYear) === parseInt(currentYear) && parseInt(expirationMonth) < parseInt(currentMonth)){
      pastExpiration = true;
    }
    setValidExpiration(!pastExpiration);
  },[expirationMonth,expirationYear])

  React.useEffect(()=>{
    let ready = false;
    if(paymentType !== null && validExpiration !== false && validSrcNum !== false && validCardNum !== false) {
      ready = true;
    }
    setReadyToPurchase(ready);
  },[paymentType, validExpiration, validSrcNum, validCardNum])


  const setPaymentMethod = (ev) => {
    setPaymentType(ev.target.value);
  }

  const numTest = (number, x) => {
    let testEval = true;
    if (number.length != x) testEval = false;
    else {
      for (let i=0; i<x; i++ ){
        if (!number[i]) testEval = false;
        else if (!(number[i] < 10 && number[i] > -1)) testEval = false;
      }
    }
    return testEval;
  }

  const handleCreditCardNum = (ev) => {
    setCreditCardNumber(ev.target.value);
    setValidCardNum(numTest(ev.target.value, 16));
  }

  const handleExpirationMonth = (ev) => {
    setExpirationMonth(ev.target.value);
  }

  const handleExpirationYear = (ev) => {
    setExpirationYear(ev.target.value);
  }

  const handleSrcNumber = (ev) => {
    setsrcNumber(ev.target.value);
    setValidSrcNum(numTest(ev.target.value, 3));
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
  let totalCost = (Math.floor(100*(shippingCost + provTaxCost + fedTaxCost + subTotal)))/100;

  const handleConfirmPurchase = (ev) => {
    ev.preventDefault();
    // setPaymentInfo({
    //   creditCardType : paymentType,
    //   creditCardNumber : creditCardNumber,
    //   expirationMonth : expirationMonth,
    //   expirationYear : expirationYear,
    //   srcNumber : srcNumber,
    //   subTotal : subTotal,
    //   provTaxCost : provTaxCost,
    //   fedTaxCost : fedTaxCost,
    //   shippingCost: shippingCost,
    //   totalCost : totalCost,
    // })
    let email = null;
    if (userInfo) email = userInfo.email;
    reduxDispatch(requestPurchase());
      
    fetch(`${ip}/mongo/purchase/${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        addAddress: shipToAddress.addAddress,
        addressHouseNum: shipToAddress.HouseNum,
        addressStreetName: shipToAddress.StreetName,
        addressCity: shipToAddress.City,
        addressProvince: shipToAddress.Province,
        addressCountry: shipToAddress.Country,
        addressPostalCode: shipToAddress.PostalCode,
        creditCardType : paymentType,
        creditCardNumber : creditCardNumber,
        expirationMonth : expirationMonth,
        expirationYear : expirationYear,
        srcNumber : srcNumber,
        subTotal : subTotal,
        provTaxCost : provTaxCost,
        fedTaxCost : fedTaxCost,
        shippingCost: shippingCost,
        totalCost : totalCost,
      }),
    }).then((resp) => {
      // console.log(resp)
      if (resp.status !== 200) {
        reduxDispatch(purchaseError());
        console.log("something went wrong...");
      }
      else {
        resp.json().then((data) => {
          // console.log('THE RES FROM PURCHASE!!!!', data);
          reduxDispatch(purchaseSuccess(data.orderId));
          reduxDispatch(receiveUserInfo(data.user));
          reduxDispatch(receiveGalleryItems(data.items));
          reduxDispatch(receiveOrdersSuccess(data.orders.orderHistory, data.orders.currentCart));
          setLastConfirmedOrderNum(data.orderId);
          setShipToAddress({
            address : null,
            houseNum : null,
            streetName : null,
            city : null,
            province : null,
            country : null,
            postalCode : null,
            });
          setPaymentInfo({
            creditCardType : null,
            creditCardNumber : null,
            expirationMonth : null,
            expirationYear : null,
            srcNumber : null,
            subTotal : null,
            provTaxCost : null,
            fedTaxCost : null,
            shippingCost: null,
            totalCost : null,
          });
          // Needs to be tested in event that user does not have an account
          setPurchaseModalVisible(purchaseModalVisible+1);
        })
      }
    })
  }

  return (
    <Wrapper>
      {/* <form action = {handleConfirmPurchase}> */}
        <RowDiv>
          <CreditCardButton
          onClick = {(ev) => setPaymentMethod(ev)}
          value = "VISA"
          paymentType = {paymentType}
          >
            VISA
          </CreditCardButton>
          <CreditCardButton
          onClick = {(ev) => setPaymentMethod(ev)}
          value = "MASTERCARD"
          paymentType = {paymentType}
          >
            MASTERCARD
          </CreditCardButton>
          <CreditCardButton
          onClick = {(ev) => setPaymentMethod(ev)}
          value = "AMERICAN-EXPRESS"
          paymentType = {paymentType}
          >
            AMERICAN-EXPRESS
          </CreditCardButton>
        </RowDiv>
        <RowDiv>
          <ColDiv>
            <label for="creditCardNumber">CARD NUMBER</label>
              <StyledInputCreditCard
              onChange = {handleCreditCardNum}
              type = "Number"
              min = "0"
              max = "9999999999999999"
              id = "creditCardNumber"
              valid = {validCardNum}
              >
              </StyledInputCreditCard>
            </ColDiv>
          </RowDiv>
          <RowDiv>
            EXP
            <ColDiv>
              <label for="expirationMonth">M</label>
              <select onChange = {handleExpirationMonth} id="expirationMonth">
                <option value="01" selected>01 - January</option>
                <option value="02">02 - February</option>
                <option value="03">03 - March</option>
                <option value="04">04 - April</option>
                <option value="05">05 - May</option>
                <option value="06">06 - June</option>
                <option value="07">07 - July</option>
                <option value="08">08 - August</option>
                <option value="09">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </ColDiv>
            <ColDiv>
              <label for="expirtationYear">Y</label>
              <select onChange = {handleExpirationYear} id="expirtationYear">
                <option value="2020" selected>2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </ColDiv>
            <ColDiv>
              <label for="srcNumber">SRC</label>
              <StyledInput
              onChange = {handleSrcNumber}
              type = "Number"
              min = "0"
              max = "999"
              id = "srcNumber"
              valid = {validSrcNum}
              >
              </StyledInput>
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
        <RowDiv>
          <StyledButton
          onClick = {handleConfirmPurchase}
          type = "submit"
          disabled = {!readyToPurchase}
          >
            CONFIRM PURCHASE
          </StyledButton>
        </RowDiv>
      {/* </form> */}
    </Wrapper>
  );
};
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px;
`
const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 10px;
`
const StyledInput = styled.input`
  background : ${props => props.valid === true ? 'white' : '#ffe6ff'};
`

const StyledInputCreditCard = styled.input`
  background : ${props => props.valid === true ? 'white' : '#ffe6ff'};
  font-size: 1.3rem;
  width: 250px;
`

const StyledButton = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  padding: 10px;
  max-width: 150px;
  margin: 10px auto;
  &:hover {
    background: grey;
  }
  &:disabled {
    cursor: not-allowed;
    background: grey;
  }
`;
const CreditCardButton = styled.button`
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  background: ${props => props.paymentType === props.value ? 'grey' : ''};
`

export default Payment;
