import styled from "styled-components";
import React from "react";

function ExistingAccount() {
  return (
    <>
      <Wrapper>WELCOME BACK</Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
`;

export default ExistingAccount;
