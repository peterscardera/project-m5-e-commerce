// sign in to existing account
// create new account

import React from "react";
import styled from "styled-components";

function Account() {
  const [createNew, setCreateNew] = React.useState(false);
  const handleClick = () => {
    setCreateNew(!createNew);
  };
  return (
    <>
      {!createNew ? (
        <Wrapper>
          <Login>
            LOGIN
            <form>
              <label>
                USERNAME:
                <input type="text" name="password" />
              </label>
            </form>
            <form>
              <label>
                PASSWORD:
                <input type="password" name="password" />
              </label>
              <input class="submitBtn" type="submit" value="LOGIN" />
            </form>
            {/* once login, redirect to userName endpoint */}
          </Login>
          <Create>
            DON'T HAVE AN ACCOUNT WITH US?
            <form>
              <label>
                <div />
                TRACK YOUR CURRENT ORDER, SEE YOUR ORDER HISTORY,
                <div />
                AND SAVE YOUR SHOPPING CART.
              </label>
              <input
                onClick={handleClick}
                class="submitBtn"
                type="submit"
                value="CREATE ACCOUNT HERE"
              />
            </form>
          </Create>
        </Wrapper>
      ) : (
        <Wrapper>
          <Login>
            CREATE ACCOUNT
            <form>
              <label>
                EMAIL
                <input type="email" name="email" />
              </label>
            </form>
            <form>
              <label>
                PASSWORD
                <input type="password" name="password" />
              </label>
              <label>
                CONFIRM PASSWORD
                <input type="password" name="password" />
              </label>
              <label>
                FIRST NAME
                <input type="text" name="first name" />
              </label>
              <label>
                LAST NAME
                <input type="text" name="last name" />
              </label>
              <label>
                HOUSE NUMBER
                <input type="text" name="house number" />
              </label>
              <label>
                STREET NAME
                <input type="text" name="street name" />
              </label>
              <label>
                POSTAL / ZIP CODE
                <input type="text" name="postal code" />
              </label>
              <label>
                CITY
                <input type="text" name="city" />
              </label>
              <label>
                PROVINCE / STATE
                <input type="text" name="province" />
              </label>
              <label>
                COUNTRY
                <input type="text" name="country" />
              </label>
              <input class="submitBtn" type="submit" value="CREATE ACCOUNT" />
            </form>
            <input
              onClick={handleClick}
              class="submitBtn"
              type="submit"
              value="BACK TO LOGIN"
            />
          </Login>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  form {
    display: flex;
    flex-direction: column;
    max-width: 500px;
  }
  label {
    font-size: 14px;
    margin: 3px 0;
  }
  input {
    width: 100%;
  }
  .submitBtn {
    background-color: black;
    color: white;
    padding: 10px;
    max-width: 150px;
    margin: 10px auto;
  }
  .submitBtn:hover {
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
  }
`;

const Login = styled.div`
  min-width: 500px;
  margin: 50px;
`;

const Create = styled.div`
  min-width: 500px;
  margin: 100px;
`;

export default Account;
