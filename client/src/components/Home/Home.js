import React from "react";
import styled from "styled-components";
import fit1 from "./fit1.png";
import fit2 from "./fit-2.png";
import fit3 from "./fit3.png";

const Home = () => {
  return (
    <>
      <Wrapper>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit1} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6678">SHOP</a>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit2} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6682">SHOP</a>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit3} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6551">SHOP</a>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit1} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6682">SHOP</a>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit2} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6682">SHOP</a>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit3} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <a href="/item/6543">SHOP</a>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px;
  margin: 50px auto 0 auto;
  .home-item {
    flex: 33.33%;
    display: flex;
    padding: 10px;
    text-align: left;
  }
  .home-item-wrapper {
    position: relative;
    width: 100%;
    height: 450px;
  }
  .home-item-image {
    position: relative;
    overflow: hidden;
  }
  .home-item-image img {
    display: block;
    width: 100%;
    height: auto;
    max-height: 450px;
    width: auto;
    max-width: 350px;
    margin: 0 auto;
  }
  .home-item-title {
    position: absolute;
    left: -10px;
    bottom: 70px;
    background: grey;
    line-height: 1.5em;
    font-weight: normal;
    padding: 7px 9px 6px;
    text-transform: uppercase;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 1.4em;
  }
  .home-item-overlay {
    background: #000;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    -webkit-transition: opacity 0.5s ease-in 0s;
    -moz-transition: opacity 0.5s ease-in 0s;
    -o-transition: opacity 0.5s ease-in 0s;
    transition: opacity 0.5s ease-in 0s;
  }
  .home-item-wrapper:hover .home-item-overlay {
    opacity: 0.3;
  }
  .home-item-button {
    // there's an issue here:
    height: 150px;
    width: 150px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -25px;
  }
  .home-item-button a {
    border-radius: 50%;
    -webkit-border-radius: 50%;
    background: black;
    text-transform: uppercase;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 1.2em;
    -webkit-transition: all 0.2s ease-in 0s;
    -moz-transition: all 0.2s ease-in 0s;
    -o-transition: all 0.2s ease-in 0s;
    transition: all 0.2s ease-in 0s;
    text-decoration: none !important;
    display: block;
  }
  .home-item-button a:hover {
    background: #3b3b3b;
  }
  .first .home-item-button {
    -webkit-transition: all 0.5s ease-in 0.5s;
    -moz-transition: all 0.5s ease-in 0.5s;
    -o-transition: all 0.5s ease-in 0.5s;
    transition: all 0.5s ease-in 0.5s;
    top: -100px;
  }
  .first .home-item-wrapper:hover .home-item-button {
    top: 40%;
  }
`;

export default Home;
