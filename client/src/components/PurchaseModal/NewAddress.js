import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { PurchaseContext } from "../../purchaseContext";

const NewAddress = () => {
  const {
    purchaseModalVisible,
    setPurchaseModalVisible,
    shipToAddress,
    setShipToAddress,
  } = React.useContext(PurchaseContext);
  const currentCart = useSelector((state) => state.orders.currentCart);
  const cartStatus = useSelector((state) => state.orders.status);

  const [quickAddress, setQuickAddress] = useState({
    givenName: "",
    surName: "",
    addressHouseNum: "",
    addressStreetName: "",
    addressPostalCode: "",
    addressCity: "",
    addressProvince: "",
    addressCountry: "",
  });
  console.log(quickAddress);
  const handleQuickAddress = (e) => {
    const values = e.target.value;
    setQuickAddress({
      ...quickAddress,
      [e.target.name]: values,
    });
  };
  return (
    <ColForm>
      <label htmlFor="givenName">
        FIRST NAME
        <input
          type="text"
          name="givenName"
          value={quickAddress.givenName}
          onChange={handleQuickAddress}
        />
      </label>
      <label htmlFor="surName">
        LAST NAME
        <input
          type="text"
          name="surName"
          value={quickAddress.surName}
          onChange={handleQuickAddress}
        />
      </label>
      <label htmlFor="addressHouseNum">
        HOUSE NUMBER
        <input
          type="text"
          name="addressHouseNum"
          value={quickAddress.addressHouseNum}
          onChange={handleQuickAddress}
        />
      </label>
      <label htmlFor="streetName">
        STREET NAME
        <input
          type="text"
          name="addressStreetName"
          onChange={handleQuickAddress}
          value={quickAddress.addressStreetName}
        />
      </label>
      <label htmlFor="country">
        COUNTRY
        <select onChange={handleQuickAddress} name="addressCountry">
          <option value="Canada">Canada</option>
          <option value="United-States">United-States</option>
          <option selected value={quickAddress.addressCountry}>
            Choose a country
          </option>
        </select>
      </label>
      {quickAddress.addressCountry === "Canada" &&
      quickAddress.addressCountry !== "Choose a country" ? (
        <label htmlFor="province">
          PROVINCE
          <select onChange={handleQuickAddress} name="addressProvince">
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
            <option selected value={quickAddress.addressCountry}>
              Choose a Province
            </option>
          </select>
        </label>
      ) : quickAddress.addressCountry === "United-States" &&
        quickAddress.addressCountry !== "Choose a country" ? (
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
            <option selected value={quickAddress.addressCountry}>
              Choose a State
            </option>
          </select>
        </label>
      ) : (
        ""
      )}
      {quickAddress.addressCountry === "Canada" &&
      quickAddress.addressCountry !== "Choose a country" ? (
        <label htmlFor="postalCode">
          POSTAL CODE
          <input
            type="text"
            name="addressPostalCode"
            onChange={handleQuickAddress}
            value={quickAddress.addressPostalCode}
          />
        </label>
      ) : quickAddress.addressCountry === "United-States" &&
        quickAddress.addressCountry !== "Choose a country" ? (
        <label htmlFor="postalCode">
          ZIP CODE
          <input
            type="text"
            name="addressPostalCode"
            onChange={handleQuickAddress}
            value={quickAddress.addressPostalCode}
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
          value={quickAddress.addressCity}
          onChange={handleQuickAddress}
        />
      </label>
    </ColForm>
  );
};

const ColForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 50vh;
  min-height: 400px;
  margin: 20px;
  /* background: red; */

  label, input, select {
    display: block;
  }
`;

export default NewAddress;
