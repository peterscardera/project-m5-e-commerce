import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";


const OrderHistory = () => {
  const [pastOrderNum, setPastOrderNum] = React.useState(0);
  const pastOrders = useSelector((state) => state.orders.orderHistory);

  const handleIncrementpastOrderNum = () => {
    setPastOrderNum(pastOrderNum + 1);
  };
  const handleDecrementpastOrderNum = () => {
    setPastOrderNum(pastOrderNum - 1);
  };
  let orderIds = [];
  pastOrders.forEach((order)=>{
    let orderId = Object.keys(order);
    orderIds.push(orderId[0]);
  })
  // console.log('Past Orders:', pastOrders);
  // console.log('Here are the ids:', orderIds);

  // console.log('targetting',orderIds[pastOrderNum]);

  let orderItemIds = [];

  if (pastOrders && pastOrderNum && orderIds && pastOrderNum) {
    // console.log('digging', pastOrders[pastOrderNum][orderIds[pastOrderNum]]);
    orderItemIds = Object.keys(pastOrders[pastOrderNum][orderIds[pastOrderNum]]);
    orderItemIds.pop();
    orderItemIds.pop();
  }
  return (
    <ColDiv>
    <RowDiv>
      <StyledButton
      onClick={handleDecrementpastOrderNum}
      disabled={pastOrderNum === 0}
      >
        Prev Order
      </StyledButton>
      <StyledButton
        onClick={handleIncrementpastOrderNum}
        disabled={pastOrders.length === 0 || pastOrderNum === pastOrders.length - 1}
      >
        Next Order
      </StyledButton>
    </RowDiv>

      <OrderConst>ORDER</OrderConst>
      <OrderModular>{orderIds[pastOrderNum]}</OrderModular>
      <OrderConst>ITEMS</OrderConst>
      {/* {orderItemIds && orderItemIds.map((id)=>{
        return (
          // {_id}
          'hi'
        )
      })} */}
      {/* {pastOrders[pastOrderNum][orderIds[pastOrderNum]]} */}
    </ColDiv>
  )
}
  export default OrderHistory;


const OrderConst = styled.div`
  color: lightgray;
`;
const OrderModular = styled.div``;

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

const ColDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 5px;
`;
