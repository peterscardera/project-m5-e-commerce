import React from "react";
import styled from "styled-components";
import fit1 from "./fit1.png";
import fit2 from "./fit-2.png";
import fit3 from "./fit3.png";
import sam1 from "./sam-1.png";
import sam2 from "./sam-2.png";
import sam3 from "./sam-3.png";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Wrapper>
        <section>
          <h1>Featured Products</h1>
        </section>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={fit1} alt="fitbit" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <NavLink to="/item/6678">SHOP</NavLink>
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
                <NavLink to="/item/6682">SHOP</NavLink>
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
                <NavLink to="/item/6551">SHOP</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={sam1} alt="samsung watch" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <NavLink to="/item/6583">SHOP</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={sam2} alt="samsung watch" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <NavLink to="/item/6999">SHOP</NavLink>
              </div>
            </div>
          </div>
        </div>
        <div class="home-item first">
          <div class="home-item-wrapper">
            <div class="home-item-image">
              <img src={sam3} alt="samsung" />
              <span class="home-item-overlay"> </span>
              <div class="home-item-button">
                <NavLink to="/item/7002">SHOP</NavLink>
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
  margin: 0 auto;
  section {
    font-size: 35px;
    display: flex;
    background-color: black;
    color: white;
    width: 100%;
    flex: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    min-height: 300px;
  }
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
    padding: 20px;
    width: 150px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -20%;
  }
  .home-item-button a {
    margin-bottom: 50px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    height: 100px;
    width: 100px;
    text-transform: uppercase;
    font-family: "Oswald", sans-serif;
    color: #ffffff;
    font-size: 18px;
    padding-top: 7px;
    padding-bottom: 7px;
    -webkit-transition: all 0.2s ease-in 0s;
    -moz-transition: all 0.2s ease-in 0s;
    -o-transition: all 0.2s ease-in 0s;
    transition: all 0.2s ease-in 0s;
    text-decoration: none !important;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
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
