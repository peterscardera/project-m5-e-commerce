import styled from "styled-components";
import React from "react";

//reminder: This is a child component of Account.js if user !null then take the user info and render this
function ExistingAccount({ loggedInUser }) {
  console.log(loggedInUser);

  return (
    <>
<<<<<<< Updated upstream
      <div>WELCOME BACK </div>
=======
      <div>WELCOME BACK {loggedInUser.givenName} </div>
>>>>>>> Stashed changes
      <div> account id: {loggedInUser.id}</div>
      <div> Email: {loggedInUser.email}</div>
      {/* display past order and more user informatiom */}
    </>
  );
}

const Wrapper = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

export default ExistingAccount;
