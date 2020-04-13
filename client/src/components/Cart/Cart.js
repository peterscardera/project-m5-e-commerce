import React from "react";
import styled from "styled-components";

import CartItems from "./CartItems";

const Cart = () => {
 

  return (
    <React.Fragment>
      <Container>
        {/* {data.map((item, index) => {
          return (
            <>
              <CartItems
                name={item.name}
                price={item.price}
                pic={item.imageSrc}
              ></CartItems>
            </>
          );
        })}
        {data.length > 3 && <div> ".." more product</div>}
        <button> See shopping cart</button> */}
      </Container>
    </React.Fragment>
  );
};

export default Cart;

const Container = styled.div`
  height: 600px;
  /* change to flexible width */
  width: 400px;
  border: 1px solid black;
  margin-left: auto;
`;
