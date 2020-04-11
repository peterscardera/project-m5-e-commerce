// sign in to existing account
// create new account

import React from "react";
import styled from "styled-components";

function Account() {
  return (
    <>
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
          CREATE ACCOUNT
          <form>
            <label>
              USERNAME:
              <input type="text" name="email" />
            </label>
          </form>
          <form>
            <label>
              PASSWORD:
              <input type="password" name="password" />
            </label>
            <input class="submitBtn" type="submit" value="CREATE" />
          </form>
        </Create>
      </Wrapper>
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
    padding: 5px;
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
  margin: 50px;
`;

export default Account;
