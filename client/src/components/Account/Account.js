// sign in to existing account
// create new account

import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ExistingAccount from "./ExistingAccount";
import {
  requestUserInfo,
  receiveUserInfo,
  receiveUserInfoError,
  requestCreateNewUser,
  createNewUserSuccess,
  createNewUserError,
  requestOrders,
  receiveOrdersSuccess,
  receiveOrdersError,
} from "../../actions";

//----------------------------------------------login reducer (tad excessive)---------------------------------
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
  let history = useHistory();

  const pushToHome = () => {
    history.push("/");
  };

  const loggedInUser = useSelector((state) => state.user.user);

  const reduxDispatch = useDispatch();
  //toggle create acct page if true
  const [createNew, setCreateNew] = useState(false);
  //state for when the server sends us back an error for logging in*
  const [errorStateLogIn, setErrorStateLogIn] = useState(null);
  //state for when the server sends us bacl an error for creating an account
  const [errorCreateState, setErrorCreateState] = useState(null);
  //state for recording what the user inputed when creating a new account
  const [createAccountUserInput, setcreateAccountUserInput] = useState({
    email: "",
    password: "",
    givenName: "",
    surName: "",
    addressHouseNum: "",
    addressStreetName: "",
    addressPostalCode: "",
    addressCity: "",
    addressProvince: "",
    addressCountry: "",
  });

  //------------------Existing User Log in: keep track of what user  is typing------------------
  const [state, dispatch] = useReducer(loginReducer, INITIAL_LOGIN);

  const handleLoginInfo = (fieldType) => (e) => {
    dispatch({
      type: "formComplete",
      fieldType,
      fieldValue: e.target.value,
    });
  };

  //-------------------------handler for when user clicked login---------------------------------
  const submitHandlerLogIn = (e) => {
    e.preventDefault();

    //when clicking this the error state must be RESET to null incase it become of the other errors
    setErrorStateLogIn(null);

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
          console.log(userData, "IM IN USERDATA LOGGED IN");
          reduxDispatch(receiveUserInfo(userData));
          //handler below will get the order history and merge a previous cart to then existing cart
          getPastInfo(userData);
        });
      } else if (resp.status === 422) {
        reduxDispatch(receiveUserInfoError());
        setErrorStateLogIn("Password does not match our records");
      } else if (resp.status === 400) {
        reduxDispatch(receiveUserInfoError());
        setErrorStateLogIn("Email doesnt seem to exist");
      } else {
        console.log("something went wrong but it shouldnt have ");
      }
    });
  };
  //------------------------------Handler to retrieve previous cart and order history of a logged in user---

  const getPastInfo = (incomingUserData) => {
    //1- get the current cart and past cart
    reduxDispatch(requestOrders());

    fetch(`/getOrders/${incomingUserData.email}`).then((response) => {
      if (response.status === 200) {
        response.json().then((jsonResp) => {
          reduxDispatch(
            receiveOrdersSuccess(jsonResp.orderHistory, jsonResp.currentCart)
          );
          console.log(jsonResp, "SERVER RESPONSE OK WITH ORDER HISTORY");
        });
      } else if (response.status === 400) {
        reduxDispatch(receiveOrdersError());
        console.log("user doesnt have existing orders which is fine");
      } else {
        console.log("server isnt happy");
      }
    });
  };

  // 2- merge existing cart to cart user had before closing tab or logging out

  // fetch(`/mergeCartGetOrders/incomingUserData.email`).then((responseTwo) => {
  //     if (responseTwo.status === 200) {
  //       responseTwo.json().then((jsonRespTwo) => {
  //        console.log(jsonRespTwo)
  //       });
  //     } else if (response.status === 400) {
  //       reduxDispatch(receiveOrdersError())
  //       console.log("user doesnt have existing orders which is fine");
  //     } else {
  //       console.log("server isnt happy")
  //     }
  //   });

  //handler for hitting the end point to retrieve anything that was in the cart prior to logging in

  //requestOrders redux dispatch
  //'/getOrders/userData.email'
  //receiveOrdersSuccess redux dispatch or receiveOrdersError

  // '/mergeCartGetOrders/:email'

  //----------------------------------Handler for creating a new account----------------------------

  //record input
  const handleCreate = (e) => {
    const values = e.target.value;
    setcreateAccountUserInput({
      ...createAccountUserInput,
      [e.target.name]: values,
    });
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    //when clicking this the error state must be RESET to null incase user triggers a different error
    setErrorCreateState(null);
    reduxDispatch(requestCreateNewUser());
    console.log("data about to submit for creation,",createAccountUserInput);

    // one beautiful nested then to create a user and "then" log the user in
    fetch(`/createAccount/${createAccountUserInput.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: createAccountUserInput.password,
        givenName: createAccountUserInput.givenName,
        surName: createAccountUserInput.surName,
        addressHouseNum: createAccountUserInput.addressHouseNum,
        addressStreetName: createAccountUserInput.addressStreetName,
        addressCity: createAccountUserInput.addressCity,
        addressProvince: createAccountUserInput.addressProvince,
        addressCountry: createAccountUserInput.addressCountry,
        addressPostalCode: createAccountUserInput.addressPostalCode,
      }),
    }).then((resp) => {
      if (resp.status === 200) {
        resp
          .json()
          .then((userData) => {
            // console.log(userData, "IT WORKED ACCOUNT CREATED");

            reduxDispatch(createNewUserSuccess());
            return userData;
            // once server says account is created successfully, below we will automatically sign in the user
          })
          .then((newUserData) => {
            fetch(`/logIn/${newUserData.email}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ password: newUserData.password }),
            }).then((newUserLogIn) => {
              if (newUserLogIn.status === 200) {
                newUserLogIn.json().then((returnData) => {
                  // console.log(returnData,"****");
                  reduxDispatch(receiveUserInfo(returnData));
                  pushToHome();
                });
              }
            });
          });
      } else if (resp.status === 403) {
        reduxDispatch(createNewUserError());
        setErrorCreateState(
          `Email: ${createAccountUserInput.email} already has an account`
        );
      } else {
        console.log("something went wrong but it shouldnt have ");
      }
    });
  };

  // console.log(createAccountUserInput);
  //----------------------------------------------------------------------------------------------

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
            <Login>
              {errorStateLogIn !== null && (
                <StyledError>{errorStateLogIn}</StyledError>
              )}
              <span> LOGIN </span>
              <form onSubmit={submitHandlerLogIn}>
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
            <FormContainer>
              {errorCreateState !== null && (
                <StyledError> {errorCreateState} </StyledError>
              )}

              <span>CREATE ACCOUNT</span>
              <form onSubmit={handleCreateSubmit}>
                <label htmlFor="email">
                  EMAIL
                  <input
                    required
                    type="email"
                    name="email"
                    value={createAccountUserInput.email}
                    onChange={handleCreate}
                  />
                </label>

                <label htmlFor="password">
                  PASSWORD
                  <input
                    required
                    type="password"
                    name="password"
                    value={createAccountUserInput.password}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="confirm-password">
                  CONFIRM PASSWORD
                  <input required type="password" name="confirm-password" />
                </label>
                <label htmlFor="givenName">
                  FIRST NAME
                  <input
                    type="text"
                    name="givenName"
                    value={createAccountUserInput.givenName}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="surName">
                  LAST NAME
                  <input
                    type="text"
                    name="surName"
                    value={createAccountUserInput.surName}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="addressHouseNum">
                  HOUSE NUMBER
                  <input
                    type="text"
                    name="addressHouseNum"
                    value={createAccountUserInput.addressHouseNum}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="streetName">
                  STREET NAME
                  <input
                    type="text"
                    name="addressStreetName"
                    onChange={handleCreate}
                    value={createAccountUserInput.addressStreetName}
                  />
                </label>
                <label htmlFor="postalCode">
                  POSTAL / ZIP CODE
                  <input
                    type="text"
                    name="addressPostalCode"
                    onChange={handleCreate}
                    value={createAccountUserInput.addressPostalCode}
                  />
                </label>
                <label htmlFor="city">
                  CITY
                  <input
                    type="text"
                    name="addressCity"
                    value={createAccountUserInput.addressCity}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="province">
                  PROVINCE / STATE
                  <input
                    type="text"
                    name="addressProvince"
                    value={createAccountUserInput.addressProvince}
                    onChange={handleCreate}
                  />
                </label>
                <label htmlFor="country">
                  COUNTRY
                  <input
                    type="text"
                    name="addressCountry"
                    value={createAccountUserInput.addressCountry}
                    onChange={handleCreate}
                  />
                </label>
                <input class="submitBtn" type="submit" />
                <input
                  onClick={() => {
                    handleClick();
                    setErrorStateLogIn(null);
                    setErrorCreateState(null);
                  }}
                  class="submitBtn"
                  type="submit"
                  value="BACK TO LOGIN"
                  //we need to reset the error state
                />
              </form>
            </FormContainer>
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

const FormContainer = styled.div``;

const StyledError = styled.div`
  color: red;
`;

export default Account;
