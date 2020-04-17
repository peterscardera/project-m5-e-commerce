import React from "react";
import styled from "styled-components";

//* This forms component is a child of Accounts.js
const Forms = ({
  createNew,
  errorStateLogIn,
  submitHandlerLogIn,
  state,
  handleLoginInfo,
  handleClick,
  errorCreateState,
  handleCreateSubmit,
  createAccountUserInput,
  handleCreate,
  setErrorCreateState,
  setErrorStateLogIn,
}) => {
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
                  // state is the reducer state in account.js
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
              <input className="submitBtn" type="submit" value="LOGIN" />
            </form>
            {/* once login, redirect to userName endpoint */}
          </Login>
          <Create>
            DON'T HAVE AN ACCOUNT WITH US?
            <form>
              <label>
                <div> TRACK YOUR CURRENT ORDER, SEE YOUR ORDER HISTORY,</div>
                <div> AND SAVE YOUR SHOPPING CART. </div>
              </label>
              <input
                onClick={handleClick}
                className="submitBtn"
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
              <label htmlFor="country">
                COUNTRY
                <select onChange={handleCreate} name="addressCountry">
                  <option value="Canada">Canada</option>
                  <option value="United-States">United-States</option>
                  <option
                    selected
                    value={createAccountUserInput.addressCountry}
                  >
                    Choose a country
                  </option>
                </select>
              </label>
              {createAccountUserInput.addressCountry === "Canada" &&
              createAccountUserInput.addressCountry !== "Choose a country" ? (
                <label htmlFor="province">
                  PROVINCE
                  <select onChange={handleCreate} name="addressProvince">
                    <option value="AB">Alberta</option>
                    <option value="BC">British Columbia</option>
                    <option value="MB">Manitoba</option>
                    <option value="NB">New Brunswick</option>
                    <option value="NL">Newfoundland and Labrador</option>
                    <option value="NS">Nova Scotia</option>
                    <option value="ON">Ontario</option>
                    <option value="PE">Prince Edward Island</option>
                    <option value="QC">Quebec</option>
                    <option value="SK">Saskatchewan</option>
                    <option value="NT">Northwest Territories</option>
                    <option value="NU">Nunavut</option>
                    <option value="YT">Yukon</option>
                    <option
                      selected
                      value={createAccountUserInput.addressCountry}
                    >
                      Choose a Province
                    </option>
                  </select>
                </label>
              ) : createAccountUserInput.addressCountry === "United-States" &&
                createAccountUserInput.addressCountry !== "Choose a country" ? (
                <label htmlFor="province">
                  STATE
                  <select>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                    <option
                      selected
                      value={createAccountUserInput.addressCountry}
                    >
                      Choose a State
                    </option>
                  </select>
                </label>
              ) : (
                ""
              )}
              {createAccountUserInput.addressCountry === "Canada" &&
              createAccountUserInput.addressCountry !== "Choose a country" ? (
                <label htmlFor="postalCode">
                  POSTAL CODE
                  <input
                    type="text"
                    name="addressPostalCode"
                    onChange={handleCreate}
                    value={createAccountUserInput.addressPostalCode}
                  />
                </label>
              ) : createAccountUserInput.addressCountry === "United-States" &&
                createAccountUserInput.addressCountry !== "Choose a country" ? (
                <label htmlFor="postalCode">
                  ZIP CODE
                  <input
                    type="text"
                    name="addressPostalCode"
                    onChange={handleCreate}
                    value={createAccountUserInput.addressPostalCode}
                  />
                </label>
              ) : (
                ""
              )}

              <label htmlFor="city">
                CITY
                <input
                  type="text"
                  name="addressCity"
                  value={createAccountUserInput.addressCity}
                  onChange={handleCreate}
                />
              </label>

              <input className="submitBtn" type="submit" />
              <input
                onClick={() => {
                  handleClick();
                  setErrorStateLogIn(null);
                  setErrorCreateState(null);
                }}
                className="submitBtn"
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
};

export default Forms;

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
