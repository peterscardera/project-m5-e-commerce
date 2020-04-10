import React from "react";
import styled from "styled-components";
import Layout from "../Layout/Layout";
import Cart from "../Cart/Cart"
const Home = () => {
  return (
    <React.Fragment>
      <Layout>
        <div>HOME PAGE</div>

{/* for now well place cart bellow  */}
<Cart />
      </Layout>
    </React.Fragment>
  );
};

export default Home;
