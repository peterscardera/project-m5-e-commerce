import React from "react";
import { Link } from "react-router-dom";

const EachUnit = ({
  name,
  price,
  body_location,
  category,
  id,
  imageSrc,
  numInStock,
  companyId,
}) => {
  return (
    <React.Fragment>
      <Link to={`/item/${id}`}>
        <img src={imageSrc} />
        <div>{name}</div>
        <span>{price}</span>
      </Link>
    </React.Fragment>
  );
};

export default EachUnit;
