// sign in to existing account
// create new account

import React, { useState, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ExistingAccount from "./ExistingAccount";
import {
  requestUserInfo,
  receiveUserInfo,
  receiveUserInfoError,
} from "../../actions";

//login state
const INITIAL_LOGIN = {
  email: "",
  password: "",
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case "formComplete":
      return {
        ...state,
        [action.fieldType]: action.fieldValue,
      };
    default:
      return INITIAL_LOGIN;
  }
};

function Account() {
  const loggedInUser = useSelector((state) => state.user.user);

  const reduxDispatch = useDispatch();
  //toggle create acct if true
  const [createNew, setCreateNew] = useState(false);
  //state for when the server sends us back an error
  const [errorState, setErrorState] = useState(null);

  //------------------Existing User Log in: keep track of what user  is typing------------------
  const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN);

  const handleLoginInfo = (fieldType) => (e) => {
    dispatch({
      type: "formComplete",
      fieldType,
      fieldValue: e.target.value,
    });
  };

  //handler for when user clicked login
  const submitHandler = (e) => {
    e.preventDefault();

    //when clicking this the error state must be RESET to null incase it become of the other errors
    setErrorState(null)

    reduxDispatch(requestUserInfo());

    fetch(`/logIn/${state.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: state.password }),
    }).then((resp) => {
      if (resp.status === 200) {
        resp.json().then((userData) => {
          console.log(userData);
          reduxDispatch(receiveUserInfo(userData));
        });
      } else if (resp.status === 422) {
        reduxDispatch(receiveUserInfoError());
        setErrorState("Password does not match our records");
      } else if (resp.status === 400) {
        
        reduxDispatch(receiveUserInfoError());
        setErrorState("Email doesnt seem to exist");
      } else {
        console.log("something went wrong but it shouldnt have ");
      }
    });
  };


  //---------------------------------------------------------------------------------------------
  //handleClick below covers the createAccount and back to login
  const handleClick = () => {
    setCreateNew(!createNew);
  };

  if (loggedInUser !== null) {
    return (
      <>
        {/* send them to home Page */}
        <ExistingAccount loggedInUser={loggedInUser}></ExistingAccount>
        {/* {loggedInUser} */}
      </>
    );
  } else {
    return (
      <>
        {!createNew ? (
          <Wrapper>
            {errorState !== null && (<div>{errorState}</div>)}
            <Login>
              LOGIN
              <form onSubmit={submitHandler}>
                <label htmlFor="email">
                  EMAIL:
                  <input
                    required
                    type="text"
                    name="email"
                    value={state.email}
                    onChange={handleLoginInfo("email")}
                  />
                </label>

                <label htmlFor="password">
                  PASSWORD:
                  <input
                    required
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleLoginInfo("password")}
                  />
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
            <div>
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
            </div>
          </Wrapper>
        )}
      </>
    );
  }
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
