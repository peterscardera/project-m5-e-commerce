import styled from "styled-components";
import React from "react";

//reminder: This is a child component of Account.js if user !null then take the user info and render this 
function ExistingAccount({loggedInUser}) {
console.log(loggedInUser)

  return (
    <>
      <div>WELCOME BACK { loggedInUser.givenName} </div>
      {/* display past order and more user informatiom */}
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
